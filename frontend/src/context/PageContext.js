import { createContext, useReducer } from "react"

export const PageContext = createContext()

export const pageReducer = (state, action) => {
    switch (action.type) {
        case 'COLLECTIONS':
            return {
                page: 'collections'
            }
        case 'ENTRIES':
            return {
                page: 'entries'
            }
        case 'BINGO':
            return {
                page: 'bingo'
            }
        default:
            return state
    }
}

export const PageContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, {
        page: 'entries'
    })

    return (
        <PageContext.Provider value={{...state, dispatch}}>
            { children }
        </PageContext.Provider>
    )
}