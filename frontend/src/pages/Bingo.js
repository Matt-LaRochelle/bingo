import { useState, useEffect } from 'react'
import { useBingosContext } from '../hooks/useBingosContext'
import { useAuthContext } from '../hooks/useAuthContext'

import BingoCell from '../components/BingoCell'
import { jsPDF } from "jspdf";


const Bingo = () => {
    const {bingos, dispatch} = useBingosContext()
    const {user} = useAuthContext()
    const [numbers, setNumbers] = useState([])
    const [newBingos, setNewBingos] = useState(null)
    const [title, setTitle] = useState('Choose a title:')
    const [error, setError] = useState(null);

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

    // Make sure title doesn't get too large
    useEffect(() => {
        if (title.length > 40) {
            setError("Title max length is 40 characters.")
        } else {
            setError(null)
        }
    }, [title])

    // generate 25 random numbers
    const createCard = () => {
        if (bingos.length < 25) {
            setError("You must have at least 25 entries to begin.")
            return
        } else {
            setError(null)
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

    const handleChange = (e) => {
        setTitle(e.target.value);
    }

    const downloadCard = () => {
        if (newBingos === null) {
            setError("Must create a card before downloading.")
            return;
        }
        if (title.length > 40) {
            setError("Title max length is 40 characters.")
            return;
        }
        // Default export is a4 paper, portrait, using millimeters for units
        setError(null)
        const doc = new jsPDF();
        
        // doc.text(title, 85, 35);
        doc.setFontSize(20);
        doc.setFont("bold");
        doc.text(title, 108, 35, null, null, "center");
        // doc.addImage(emptyCard, "PNG", 15, 40, 180, 180);
        doc.setFontSize(11);
        doc.setFont("normal");
        // doc.setDrawColor(255, 0, 0);
        doc.cell(19, 43, 35, 35, newBingos[0].entry)
        doc.cell(54, 43, 35, 35, newBingos[1].entry)
        doc.cell(89, 43, 35, 35, newBingos[2].entry)
        doc.cell(124, 43, 35, 35, newBingos[3].entry)
        doc.cell(159, 43, 35, 35, newBingos[4].entry)
        doc.cell(19, 78, 35, 35, newBingos[5].entry)
        doc.cell(54, 78, 35, 35, newBingos[6].entry)
        doc.cell(89, 78, 35, 35, newBingos[7].entry)
        doc.cell(124, 78, 35, 35, newBingos[8].entry)
        doc.cell(159, 78, 35, 35, newBingos[9].entry)
        doc.cell(19, 113, 35, 35, newBingos[10].entry)
        doc.cell(54, 113, 35, 35, newBingos[11].entry)
        doc.cell(89, 113, 35, 35, newBingos[12].entry)
        doc.cell(124, 113, 35, 35, newBingos[13].entry)
        doc.cell(159, 113, 35, 35, newBingos[14].entry)
        doc.cell(19, 148, 35, 35, newBingos[15].entry)
        doc.cell(54, 148, 35, 35, newBingos[16].entry)
        doc.cell(89, 148, 35, 35, newBingos[17].entry)
        doc.cell(124, 148, 35, 35, newBingos[18].entry)
        doc.cell(159, 148, 35, 35, newBingos[19].entry)
        doc.cell(19, 183, 35, 35, newBingos[20].entry)
        doc.cell(54, 183, 35, 35, newBingos[21].entry)
        doc.cell(89, 183, 35, 35, newBingos[22].entry)
        doc.cell(124, 183, 35, 35, newBingos[23].entry)
        doc.cell(159, 183, 35, 35, newBingos[24].entry)
        doc.save("a4.pdf");
    }
    

    return (
        <div className="create-bingo">
        {error && <div className="error">{error}</div>}
            <div className="bingo-buttons">
                {/* <button onClick={handleClick}>Get bingo details</button> */}
                <button onClick={createCard}>Create card</button>
                <button onClick={downloadCard}>Download card</button>
                {/* <button onClick={reset}>Reset random numbers to empty array</button>
                <button onClick={reveal}>Reveal array of numbers</button> */}
            </div>
            <input className="title" type="text" placeholder='Title:' value={title} onChange={handleChange}></input>
            <h2>{title}</h2>
            <div className="bingo">
                {newBingos && newBingos.map((newBingo) => (
                    <BingoCell bingo={newBingo}>{newBingo.entry}</BingoCell>
                ))}
            </div>
        </div>
    )
}

export default Bingo;