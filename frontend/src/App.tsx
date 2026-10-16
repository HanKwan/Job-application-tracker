import './css/App.css'
import Home from './pages/Home'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1 className="app-title">Job Application Tracker</h1>
        <p className="app-subtitle">
          Keep track of your journey, one step at a time.
        </p>
      </header>

      <Home />
    </main>
  )
}

export default App