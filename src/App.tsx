import ApplicationList from './components/ApplicationList'
import './css/App.css'
import type { AppItem } from './types/AppType'

function App() {

  const applications: AppItem[] = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Dev",
    status: "Applied",
    date: "2026-04-06"
  }
]


  return (
    <>
      <p>hi from app</p>
      <ApplicationList applications={applications}/>
    </>

  )
}

export default App
