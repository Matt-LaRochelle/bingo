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
                                <Link to="/"><p>Create Entry</p></Link>
                                <Link to="/bingo"><p>Generate Bingo</p></Link>
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
                        <div>
                            <Link to="/login"><p>Login</p></Link>
                            <Link to="/signup"><p>Signup</p></Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;