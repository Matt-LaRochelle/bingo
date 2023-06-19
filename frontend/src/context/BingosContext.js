import { createContext, useReducer } from "react"

export const BingosContext = createContext()

export const bingoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BINGOS':
            return {
                bingos: action.payload
            }
        case 'CREATE_BINGO':
            return {
                bingos: [action.payload, ...state.bingos]
            }
        case 'DELETE_BINGO':
            return {
                bingos: state.bingos.filter((b) => b._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const BingosContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bingoReducer, {
        bingos: []
    })

    return (
        <BingosContext.Provider value={{...state, dispatch}}>
            { children }
        </BingosContext.Provider>
    )
}