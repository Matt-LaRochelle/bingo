import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })

    // check to see if the user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    // This is part of the old code and used for debugging
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}