import CollectionDetails from '../components/Collections/CollectionDetails'
import CollectionForm from '../components/Collections/CollectionForm'

const Main = () => {
    return (
        <div className="main-container">
            <h2>Collections:</h2>
            <div>
                <CollectionForm />
            </div>
        </div>
    )
}

export default Main