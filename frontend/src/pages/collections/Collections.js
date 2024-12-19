import { useEffect } from 'react'
import { useCollectionsContext } from '../../hooks/useCollectionsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Collections.module.css'

import Pagination from '../main/components/Pagination'

import CollectionDetails from './components/CollectionDetails'
import CollectionForm from './components/CollectionForm'

const Collections = () => {
    const {collections, dispatch} = useCollectionsContext()

    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCollections = async () => {
            const response = await fetch('https://bingo-api.onrender.com/api/collections', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)

            if (response.ok) {
                dispatch({type: 'SET_COLLECTIONS', payload: json})
            }
        }

        if (user) {
            fetchCollections()
        }
        
    }, [dispatch, user])


    return (
        <div className={styles.container}>
            <Pagination />
            <h2>Collections:</h2>
            <div className={styles.collections}>
                <div>
                    <CollectionForm />
                </div>
                <div className={styles.details}>
                    {collections && collections.map((collection) => (
                            <CollectionDetails key={collection._id} collection={collection} />
                        ))}
                </div>
            </div>
            
        </div>
    )
}

export default Collections