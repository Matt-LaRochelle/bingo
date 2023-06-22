import { useState } from "react"
import { useBingosContext } from "../hooks/useBingosContext"
import { useAuthContext } from '../hooks/useAuthContext'

const BingoForm = ({toggle}) => {
    const { dispatch } = useBingosContext()
    const { user } = useAuthContext()

    const [entry, setEntry] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const bingo = {entry}

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
            <h3 onClick={toggle} >Add a New Bingo Entry</h3>

            <label>Entry:</label>
            <input
                type="text"
                onChange={(e) => setEntry(e.target.value)}
                value={entry}
                className={emptyFields && emptyFields.includes('entry') ? 'error' : ''}
            />

            <button>Add Entry</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BingoForm