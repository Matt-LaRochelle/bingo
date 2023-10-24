import styles from './Collection.module.css'
import { useState } from 'react'
import { useCollectionsContext } from "../../../hooks/useCollectionsContext"
import { useAuthContext } from '../../../hooks/useAuthContext'
import { usePageContext } from '../../../hooks/usePageContext'

const CollectionDetails = ({ collection, toggle }) => {
    const { dispatch } = useCollectionsContext()
    const {dispatch: pageDispatch} = usePageContext()
    const { user } = useAuthContext()

    const chooseCollection = () => {
        console.log(collection._id)
        dispatch({type: 'SET_COLLECTION', payload: collection})
        pageDispatch({type: 'ENTRIES'})
    }

    // Deletes the current collection
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('https://bingo-api.onrender.com/api/collections/' + collection._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log("delete what?: ", json)

        if (response.ok) {
            dispatch({type: 'DELETE_COLLECTION', payload: json})
        }
    }

    return (
        <div className={styles.container}>
            <h2>{collection.title}</h2>
            <button className={styles.button} onClick={chooseCollection}>Choose Collection</button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CollectionDetails