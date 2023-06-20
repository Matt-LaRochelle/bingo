import { useState, useEffect } from 'react'
import { useBingosContext } from '../hooks/useBingosContext'
import { useAuthContext } from '../hooks/useAuthContext'


const Bingo = () => {
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()
    const [numbers, setNumbers] = useState([])
    const [newBingos, setNewBingos] = useState(null)

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
        
    }, [dispatch, user, newBingos])

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
            // run loop to create 25 random numbers
            let i = 0;
            let array = []
            while (i < 25) {
                const number = Math.floor(Math.random() * bingos.length) + 1;
                if (!array.includes(number)) {
                    array.push(number)
                    i++;
                }
            }

            // set a list with the random numbers
            setNumbers(() => array)

            // create a new array with the bingos in the order of the randomly generated numbers
            setNewBingos(() => {
                return array.map((index) => bingos[index - 1])
            })
        }
    }

    return (
        <div className="create-bingo">
            <div className="bingo-buttons">
                <button onClick={handleClick}>Get bingo details</button>
                <button onClick={createCard}>Create a card</button>
                <button onClick={reset}>Reset random numbers to empty array</button>
                <button onClick={reveal}>Reveal array of numbers</button>
            </div>
            <h2>Current Bingo Entries:</h2>
            <div className="bingo">
                {bingos && bingos.map((bingo) => (
                        <p>{bingo.entry}</p>
                    ))}
            </div>
            <h2>New Bingo Card:</h2>
            <div className="bingo">
                {newBingos && newBingos.map((newBingo) => (
                    <p className="bingo-single-entry">{newBingo.entry}</p>
                ))}
            </div>
            
        </div>
    )
}

export default Bingo;