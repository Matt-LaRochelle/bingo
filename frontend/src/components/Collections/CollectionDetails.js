import styles from './Collection.module.css'
import { useCollectionsContext } from "../../hooks/useCollectionsContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const CollectionDetails = ({ collection }) => {
    const { dispatch } = useCollectionsContext()
    const { user } = useAuthContext()

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
            <button>Choose Collection</button>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default CollectionDetails