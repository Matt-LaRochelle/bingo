import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Main from './pages/main/Main'
import Navbar from './pages/main/components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Forgot from './pages/Forgot'
import ResetPassword from './pages/Reset'

// This is just a test for changing the folder names.
// I want to see if it affects the way I upload things to github.
function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
          <Route
              path="/"
              element={user ? <Main /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route 
              path="/reset-password/:token"
              element={!user ? <ResetPassword /> : <Navigate to="/" />}
              />
            <Route
              path='/forgot'
              element={!user ? <Forgot /> : <Navigate to="/" />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
