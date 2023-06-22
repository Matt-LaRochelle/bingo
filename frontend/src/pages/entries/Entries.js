import { useEffect } from 'react'
import {useCollectionsContext} from '../../hooks/useCollectionsContext'
import { useBingosContext } from '../../hooks/useBingosContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './Entries.module.css'

// components
import EntryDetails from './components/EntryDetails'
import EntryForm from './components/EntryForm'

const Entries = ({toggle, card}) => {
    const {collections, dispatch: collectionsDispatch} = useCollectionsContext()
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBingos = async () => {
            const response = await fetch('/api/bingos', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BINGOS', payload: json})
            }
        }

        if (user) {
            fetchBingos()
        }
        
    }, [dispatch, user])

    return (
        <div>
            <h1>Collection title: {collections.title}</h1>
            <div className="home">
                <div>
                    <EntryForm className="form"/>
                    <div className={styles.pageButtons}>
                        <button onClick={toggle}>Back to Collections</button>
                        <button onClick={card}>Create a Card</button>
                    </div>
                    
                </div>
                <div className="workouts">
                    {bingos && bingos.map((bingo) => (
                        <EntryDetails key={bingo._id} bingo={bingo} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Entries;