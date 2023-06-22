import { createContext, useReducer } from "react"

export const CollectionsContext = createContext()

export const collectionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COLLECTIONS':
            return {
                collections: action.payload
            }
        case 'CREATE_COLLECTION':
            return {
                collections: [action.payload, ...state.collections]
            }
        case 'DELETE_COLLECTION':
            return {
                collections: state.collections.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CollectionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(collectionReducer, {
        collecitons: []
    })

    return (
        <CollectionsContext.Provider value={{...state, dispatch}}>
            { children }
        </CollectionsContext.Provider>
    )
}