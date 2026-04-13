import { AppliedProvider } from './contexts/AppliedApplicationContext'
import './css/App.css'
import Home from './pages/Home'

function App() {

  return (
    <AppliedProvider>
      <Home />
    </AppliedProvider>

  )
}

export default App
