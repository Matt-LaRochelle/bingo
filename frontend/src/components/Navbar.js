import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [nav, setNav] = useState(false);

    const handleClick = () => {
        logout()
    }

    const openMenu = () => {
        setNav(!nav)
    }

    return (
        <header>
            <div className="container">
                    <Link to="/">
                        <h1>Bingo Cards</h1>
                    </Link>
                <nav>
                    {user && (
                        <div>
                            <div className={nav ? "nav-links nav-active" : "nav-links"}>
                                <Link onClick={openMenu} to="/"><p>Create Entry</p></Link>
                                <Link onClick={openMenu} to="/bingo"><p>Generate Bingo</p></Link>
                                <Link onClick={openMenu} to="/main"><p>Collections</p></Link>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                            <div className="nav-hamburger">
                                <span onClick={openMenu} class="material-symbols-outlined">
                                    {nav ? "Close" : "Menu"}
                                </span>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div className="login-links">
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;