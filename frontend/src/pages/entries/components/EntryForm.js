import { useState } from "react"
import { useBingosContext } from "../../../hooks/useBingosContext"
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useCollectionsContext } from '../../../hooks/useCollectionsContext'

const EntryForm = () => {
    const { dispatch } = useBingosContext()
    const { user } = useAuthContext()
    const {collections} = useCollectionsContext()

    const [entry, setEntry] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const collection_id = collections[0]._id;

        const bingo = {entry, collection_id}

        const response = await fetch('/api/bingos', {
            method: 'POST',
            body: JSON.stringify(bingo),
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
            setEntry('')
            setError(null)
            setEmptyFields([])
            console.log('new entry added', json)
            dispatch({type: 'CREATE_BINGO', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Bingo Entry</h3>
            <input
                type="text"
                onChange={(e) => setEntry(e.target.value)}
                value={entry}
                className={emptyFields && emptyFields.includes('entry') ? 'error' : ''}
            />

            <button className="form-button">Add Entry</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EntryForm