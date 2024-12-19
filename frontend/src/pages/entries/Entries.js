import { useEffect } from 'react'
import {useCollectionsContext} from '../../hooks/useCollectionsContext'
import { useBingosContext } from '../../hooks/useBingosContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { usePageContext} from '../../hooks/usePageContext'
import styles from './Entries.module.css'

// components
import EntryDetails from './components/EntryDetails'
import EntryForm from './components/EntryForm'
import Pagination from '../main/components/Pagination'

const Entries = () => {
    const {collections} = useCollectionsContext()
    const {dispatch: pageDispatch} = usePageContext()
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBingos = async () => {

            const collection_id = collections[0]._id

            const response = await fetch('https://bingo-api.onrender.com/api/bingos/' + collection_id, {
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

    const pageSwitch = (e) => {
        if (e.target.id === 'collection') {
            pageDispatch({type: 'COLLECTIONS'})
        }
        if (e.target.id === 'bingo') {
            pageDispatch({type: 'BINGO'})
        }
    }

    return (
        <div className="entry-container">
            <Pagination />
            <div className={styles.pageButtons}>
                <button className={styles.button} id="collection" onClick={pageSwitch}>Back to Collections</button>
                <button className={styles.button} id="bingo" onClick={pageSwitch}>Generate Bingo Cards</button>
            </div>
            <h1>{collections && collections[0].title}</h1>
            <div>
                <EntryForm className="form"/>
            </div>
            <div className="workouts">
                {bingos && bingos.map((bingo) => (
                    <EntryDetails key={bingo._id} bingo={bingo} />
                ))}
            </div>
        </div>
    )
}

export default Entries;