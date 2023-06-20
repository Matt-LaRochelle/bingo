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
        console.log("You clicked me!")
        setNav(!nav)
    }
    const nlink = "nav-links";
    const nactive = "nav-active";

    // className={nav ? ["menu", "active"].join(' ') : ["menu"]}

    return (
        <header>
            <div className="container">
                    <Link to="/">
                        <h1>DnD Extras</h1>
                    </Link>
                <nav>
                    {user && (
                        <div>
                            <div className={nav ? nactive : nlink}>
                                <Link to="/bingo">Bingo</Link>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                            <div className="nav-hamburger">
                                <span onClick={openMenu} class="material-symbols-outlined">
                                    Menu
                                </span>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;