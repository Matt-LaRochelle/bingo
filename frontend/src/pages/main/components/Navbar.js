import { Link } from 'react-router-dom'
import { useLogout } from '../../../hooks/useLogout'
import { useAuthContext } from '../../../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
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
                            <div>
                                <span className="nav-email">{user.email}</span>
                                <button className="button" onClick={handleClick}>Log Out</button>
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