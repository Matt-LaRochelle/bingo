import { useAuthContext } from './useAuthContext'
import { useBingosContext } from './useBingosContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: bingosDispatch } = useBingosContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        bingosDispatch({type: 'SET_BINGOS', payload: null})
    }
    return {logout}
}