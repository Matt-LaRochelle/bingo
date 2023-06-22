import { useState } from 'react'
import Collections from '../collections/Collections'
import Entries from '../Entries'
import Bingo from '../Bingo'

const Main = () => {
    const [collectionsView, setCollectionsView] = useState(true)
    const [cardView, setCardView] = useState(false)

    const toggle = () => {
        setCollectionsView(!collectionsView)
    }
    const card = () => {
        setCardView(!cardView)
    }
    return (
        <div>
            {!cardView && <div>
                {collectionsView && <Collections toggle={toggle}/>}
                {!collectionsView && <Entries toggle={toggle} card={card}/>}
            </div>
            }
            {cardView && <Bingo card={card}/>}
        </div>
    )
}

export default Main