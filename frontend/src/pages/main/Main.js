import { useEffect } from 'react'
import { useCollectionsContext } from '../../hooks/useCollectionsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Main.module.css'

import CollectionDetails from '../../components/Collections/CollectionDetails'
import CollectionForm from '../../components/Collections/CollectionForm'

const Main = () => {
    const {collections, dispatch} = useCollectionsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCollections = async () => {
            const response = await fetch('/api/collections', {
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

export default Main