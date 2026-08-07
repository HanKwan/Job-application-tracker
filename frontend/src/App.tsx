import './css/App.css'
import Home from './pages/Home'

function App() {

  return (
      <div>
        <h1 style={{
          marginBottom: "24px",
          padding: "8px 0",
          textAlign: "center",
        }}>
          Job Application tracker</h1>

        <Home />
      </div>
  )
}

export default App
