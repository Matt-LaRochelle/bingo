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

import { IoIosCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";



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
        <div className={styles.container}>
            <Pagination />
            <div className="entry-title">
                <h2>{collections && collections[0].title}</h2>
                <div className="entry-count">
                    <h2>Count: {bingos ? bingos.length : "0"}</h2>
                    {bingos.length > 24 ? <IoIosCheckmarkCircleOutline className="icon check" /> : <IoMdCloseCircleOutline className="icon close" />}
                </div>
            </div>
            <div className="entry-container">
                <div>
                    <EntryForm className="form"/>
                </div>
                <div className="entries">
                    {bingos && bingos.map((bingo) => (
                        <EntryDetails key={bingo._id} bingo={bingo} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Entries;