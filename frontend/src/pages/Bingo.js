import { useState, useEffect } from 'react'
import { useBingosContext } from '../hooks/useBingosContext'
import { useAuthContext } from '../hooks/useAuthContext'


const Bingo = () => {
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()
    const [numbers, setNumbers] = useState([])

    // Get bingo entry information
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

    // Check the bingo entries list
    const handleClick = () => {
        console.log(bingos)
    }
    // Reset the random generation list
    const reset = () => {
        setNumbers([])
        console.log(numbers)
        console.log("Reset complete")
    }
    // Reveal the random generation list
    const reveal = () => {
        console.log(numbers)
    }

    // generate 25 random numbers
    const createCard = () => {
        if (bingos.length < 25) {
            alert("You must have at least 25 entries to begin.")
            return
        } else {
            let i = 0;
            let array = []
            while (i < 25) {
                const number = Math.floor(Math.random() * bingos.length) + 1;
                if (!array.includes(number)) {
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
            <button onClick={reset}>Reset random numbers to empty array</button>
            <button onClick={reveal}>Reveal array of numbers</button>
            <div>
                {bingos && bingos.map((bingo) => (
                        <p>{bingo.entry}</p>
                    ))}
            </div>
            <div>
                {bingos && bingos.map((bingo) => (
                        <p>{bingo.entry}</p>
                    ))}
            </div>
            
        </div>
    )
}

export default Bingo;