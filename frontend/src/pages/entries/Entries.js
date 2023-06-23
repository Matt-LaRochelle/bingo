import { useEffect } from 'react'
import {useCollectionsContext} from '../../hooks/useCollectionsContext'
import { useBingosContext } from '../../hooks/useBingosContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { usePageContext} from '../../hooks/usePageContext'
import styles from './Entries.module.css'

// components
import EntryDetails from './components/EntryDetails'
import EntryForm from './components/EntryForm'

const Entries = () => {
    const {collections, dispatch: collectionsDispatch} = useCollectionsContext()
    const {page, dispatch: pageDispatch} = usePageContext()
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

    const pageSwitch = (e) => {
        if (e.target.id === 'collection') {
            pageDispatch({type: 'collections', payload: 'collections'})
        }
        if (e.target.id === 'bingo') {
            pageDispatch({type: 'bingo', payload: 'bingo'})
        }
    }

    return (
        <div>
            <h1>Collection title:</h1>
            <div className="home">
                <div>
                    <EntryForm className="form"/>
                    <div className={styles.pageButtons}>
                        <button id="collection" onClick={pageSwitch}>Back to Collections</button>
                        <button id="bingo" onClick={pageSwitch}>Create a Card</button>
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