import { BingosContext } from "../context/BingosContext"
import { useContext } from "react"

export const useBingosContext = () => {
    const context = useContext(BingosContext)

    if (!context) {
        throw Error('useBingosContext must be used inside a BingosContextProvider')
    }

    return context
}