import './Pagination.css';
import { usePageContext } from '../../../hooks/usePageContext'

const Pagination = () => {
    const {page, dispatch} = usePageContext()
    const handleClick = () => {
        console.log('clicked', page)
    }
    const toEntries = () => {
        console.log('clicked', page)
        dispatch({type: 'ENTRIES'})
    }
    const toCollections = () => {
        console.log('clicked', page)
        dispatch({type: 'COLLECTIONS'})
    }
    const toBingo = () => {
        console.log('clicked', page)
        dispatch({type: 'BINGO'})
    }
        return (
        <div className="pagination-container">
            {/* <button>Back</button> */}
            <button className={page === 'bingo' ? 'button' : 'inactive'} onClick={toEntries}>Back</button>
            <button className={page === 'entries' ? 'button' : 'inactive'} onClick={toCollections}>Back</button>
            <li className={page === 'collections' ? 'active' : ''}>Themes</li>
            <li className={page === 'entries' ? 'active' : ''}>Entries</li>
            <li className={page === 'bingo' ? 'active' : ''}>Generate</li>
            <button className={page === 'entries' ? 'button' : 'inactive'} onClick={toBingo}>Forward</button>
        </div>
    )
}

export default Pagination;