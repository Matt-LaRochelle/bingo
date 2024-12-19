import './Pagination.css';
import { usePageContext } from '../../../hooks/usePageContext'

const Pagination = () => {
    const {page, dispatch} = usePageContext()
    const handleClick = () => {
        console.log('clicked', page)
    }
    const toBack = () => {
        if (page === 'entries') {
            dispatch({type: 'COLLECTIONS'})
        } else if (page === 'bingo') {
            dispatch({type: 'ENTRIES'})
        } else {
            alert("You're at the beginning")
        }
    }
    const toForward = () => {
        if (page === 'collections') {
            alert("To move forward, please select a theme. If no themes exist, please create one.")
        } else if (page === 'entries') {
            dispatch({type: 'BINGO'})
        } else {
            alert("You're at the end")
        }
    }

    const toBingo = () => {
        console.log('clicked', page)
        dispatch({type: 'BINGO'})
    }
        return (
        <div className="pagination-container">
            <button className={(page === 'bingo' || page === 'entries') ? 'button' : 'inactive button'} onClick={toBack}>Back</button>
            <ul>
                <li className={page === 'collections' ? 'active' : ''}>Themes</li>
                <li className={page === 'entries' ? 'active' : ''}>Entries</li>
                <li className={page === 'bingo' ? 'active' : ''}>Generate</li>
            </ul>
            <button className={page === 'entries' ? 'button' : 'inactive button'} onClick={toForward}>Forward</button>
        </div>
    )
}

export default Pagination;