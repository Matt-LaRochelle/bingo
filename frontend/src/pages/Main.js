import CollectionDetails from '../components/Collections/CollectionDetails'
import CollectionForm from '../components/Collections/CollectionForm'

const Main = () => {
    return (
        <div className="main-container">
            <h2>Collections:</h2>
            <div>
                <CollectionDetails />
                <CollectionForm />
                <CollectionForm />
                <CollectionForm />
            </div>
        </div>
    )
}

export default Main