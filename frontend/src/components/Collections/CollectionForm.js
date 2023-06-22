import styles from './Collection.module.css'
import { useState } from 'react'
import { useBingosContext } from "../../hooks/useBingosContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const CollectionForm = () => {
    const { dispatch } = useBingosContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
        }

        const collection = {title}

        const response = await fetch('/api/collections', {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setError(null)
            setEmptyFields([])
            console.log('new collection added', json)
            // dispatch({type: 'CREATE_BINGO', payload: json})
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input value={title} onChange={handleChange}></input>
                {error && <div className="error">{error}</div>}
                <button className={emptyFields && emptyFields.includes('title') ? 'error' : ''}>Create Collection</button>
            </form>
        </div>
    )
}

export default CollectionForm