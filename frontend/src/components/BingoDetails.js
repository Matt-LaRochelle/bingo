import { useBingosContext } from "../hooks/useBingosContext"
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BingoDetails = ({ bingo }) => {
    const { dispatch } = useBingosContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/bingos/' + bingo._id, {
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
        <div className="workout-details">
            {/* bingo.entry */}
            <h4>{bingo.entry}</h4> 
            <p>{formatDistanceToNow(new Date(bingo.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default BingoDetails