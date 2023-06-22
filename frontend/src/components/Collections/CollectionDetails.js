import styles from './Collection.module.css'
import { Link } from 'react-router-dom'
import { useCollectionsContext } from "../../hooks/useCollectionsContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const CollectionDetails = ({ collection }) => {
    const { dispatch } = useCollectionsContext()
    const { user } = useAuthContext()


    // Render current collection
    const chooseCollection = () => {
        console.log("You clicked me!")
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
            <button onClick={chooseCollection}><Link to="/entries"><p>Chose Collection</p></Link></button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CollectionDetails