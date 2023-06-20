const BingoCell = ({ bingo }) => {
    return (
        <div className="bingo-cell">
            <h4>{bingo.entry}</h4> 
        </div>
    )
}

export default BingoCell