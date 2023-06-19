import { useEffect } from 'react'
import { useBingosContext } from '../hooks/useBingosContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import BingoDetails from '../components/BingoDetails'
import BingoForm from '../components/BingoForm'

const Home = () => {
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchBingos = async () => {
            const response = await fetch('/api/bingos', {
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

    const handleClick = () => {
        console.log(bingos)
    }

    return (
        <div className="home">
            <div className="workouts">
                {bingos && bingos.map((bingo) => (
                    <BingoDetails key={bingo._id} bingo={bingo} />
                ))}
            </div>
            <BingoForm />
            <button onClick={handleClick}>Get bingo details</button>
        </div>
    )
}

export default Home;