const BingoCell = ({ bingo }) => {
    return (
        <div className="bingo-cell">
            <p>{bingo.entry}</p> 
        </div>
    )
}

export default BingoCell