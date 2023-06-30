import { useBingosContext } from "../../../hooks/useBingosContext"
import { useAuthContext } from '../../../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EntryDetails = ({ bingo }) => {
    const { dispatch } = useBingosContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('https://bingo-api.onrender.com/api/bingos/' + bingo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BINGO', payload: json})
        }
    }

    return (
        <div className="entry-details">
            <h4>{bingo.entry}</h4> 
            <p>{formatDistanceToNow(new Date(bingo.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default EntryDetails