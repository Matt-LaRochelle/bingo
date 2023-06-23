import { useState } from 'react'
import { usePageContext } from '../../hooks/usePageContext'
import Collections from '../collections/Collections'
import Entries from '../entries/Entries'
import Bingo from '../bingo/Bingo'

const Main = () => {
    const {page, dispatch} = usePageContext()

    // const [collectionsView, setCollectionsView] = useState(true)
    // const [cardView, setCardView] = useState(false)

    // const toggle = () => {
    //     setCollectionsView(!collectionsView)
    // }
    // const card = () => {
    //     setCardView(!cardView)
    // }

    return (
        <div>
            {page === 'collections' && <Collections />}
            {page === 'entries' && <Entries />}
            {page === 'bingo' && <Bingo />}
        </div>
    )
}

export default Main