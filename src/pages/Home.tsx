import { useState } from "react"
import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"

function Home () {
    const [applications, setApplications] = useState<AppItem[]>([])
    
    const handleAdd = (newApp: AppItem) => {
        setApplications(prev => [...prev, newApp])
    }

    const handleUpdate = (updatedApp: AppItem) => {
        setApplications(prev => prev.map(app => 
            app.id === updatedApp.id ? updatedApp : app))
    }

    return (
        <>
            <ApplicationForm onAdd={handleAdd}/>
            <ApplicationList applications={applications} onUpdate={handleUpdate}/>
        </>

    )
}

export default Home