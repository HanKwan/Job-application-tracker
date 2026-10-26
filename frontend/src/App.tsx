import { useEffect, useState } from 'react'
import './css/App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthError, checkSession, logout } from './services/authService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [sessionError, setSessionError] = useState('')

  const handleLogout = async () => {
    try {
      await logout()    // send request to backend to log out
      setIsAuthenticated(false) // switch to login page
      setSessionError('')
    } catch (error: unknown) {
      setSessionError(
        error instanceof AuthError
          ? error.message
          : 'Logout failed. Please try again.'
      )
    }
  }

  useEffect(() => {
    let isMounted = true

    checkSession()
      .then((hasSession) => {
        if (isMounted) setIsAuthenticated(hasSession)
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setSessionError(
            error instanceof AuthError
              ? error.message
              : 'The session could not be checked. Please try again.'
          )
        }
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1 className="app-title">Job Application Tracker</h1>
        <p className="app-subtitle">
          Keep track of your journey, one step at a time.
        </p>
      </header>

      {isCheckingSession ? (
        <p role="status">Checking your session...</p>
      ) : isAuthenticated ? (
        <Home onLogout={handleLogout} />
      ) : (
        <>
          {sessionError && <p role="alert">{sessionError}</p>}
          <Login
            onLoginSuccess={() => {
              setSessionError('')
              setIsAuthenticated(true)
            }}
          />
        </>
      )}
    </main>
  )
}

export default App
