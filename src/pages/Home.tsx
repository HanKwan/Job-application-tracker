import { useState } from "react"
import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"
import "../css/Home.css"

function Home () {
    const [applications, setApplications] = useState<AppItem[]>([])
    
    const handleAdd = (newApp: AppItem) => {
        setApplications(prev => [...prev, newApp])
    }

    const handleUpdate = (updatedApp: AppItem) => {
        setApplications(prev => prev.map(app => 
            app.id === updatedApp.id ? updatedApp : app))
    }
    console.log(applications);
    

    return (
        <form className="container">
            <ApplicationForm onAdd={handleAdd}/>
            <ApplicationList applications={applications} onUpdate={handleUpdate}/>
        </form>

    )
}

export default Home