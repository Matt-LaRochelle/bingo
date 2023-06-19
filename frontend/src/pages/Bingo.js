import { useState, useEffect } from 'react'
import { useBingosContext } from '../hooks/useBingosContext'
import { useAuthContext } from '../hooks/useAuthContext'


const Bingo = () => {
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()
    const [numbers, setNumbers] = useState([])
    const [create, setCreate] = useState(false)

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

    // Check the bingos data
    const handleClick = () => {
        console.log(bingos)
    }
    // Reset the bingo list
    const reset = () => {
        setNumbers([])
        console.log(numbers)
        console.log("Reset complete")
    }
    // Reveal the bingo list
    const reveal = () => {
        console.log(numbers)
    }

    // main logic for creating a bingo list
    const createCard = () => {
        if (bingos.length < 25) {
            alert("You must have at least 25 entries to begin.")
            return
        } else {
            let i = 0;
            let array = []
            while (i < 25) {
                const number = Math.floor(Math.random() * 25) + 1;
                if (array.includes(number)) {
                    console.log("Try again")
                } else {
                    array.push(number)
                    i++;
                }
            }
            setNumbers(array)
        }
    }

    return (
        <div className="home">
            <button onClick={handleClick}>Get bingo details</button>
            <button onClick={createCard}>Create a card</button>
            <button onClick={reset}>Reset things</button>
            <button onClick={reveal}>Reveal things</button>
        </div>
    )
}

export default Bingo;