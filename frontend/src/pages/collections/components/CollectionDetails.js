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
        pageDispatch({type: 'entries'})
    }

    // Deletes the current collection
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/collections/' + collection._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_COLLECTION', payload: json})
        }
    }

    return (
        <div className={styles.container}>
            <h2>{collection.title}</h2>
            <button onClick={chooseCollection}>Choose Collection</button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CollectionDetails