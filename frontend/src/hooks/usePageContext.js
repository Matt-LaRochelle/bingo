import { PageContext } from "../context/PageContext"
import { useContext } from "react"

export const usePageContext = () => {
    const context = useContext(PageContext)

    if (!context) {
        throw Error('usePageContext must be used inside a PageContextProvider')
    }

    return context
}