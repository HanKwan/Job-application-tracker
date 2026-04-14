import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"
import "../css/Home.css"
import { useEffect, useState } from "react"

function Home () {
    const [appliedApp, setAppliedApp] = useState<AppItem[]>(() => {
        const stored = localStorage.getItem("applied")
        if (!stored) return []

        try {
            const parsed = JSON.parse(stored)
            return Array.isArray(parsed) ? parsed : []
        } catch {
            return []
        }
    })
    
    useEffect(() => {
            localStorage.setItem("applied", JSON.stringify(appliedApp))
        }, [appliedApp])

    const handleAdd = (newApp: AppItem) => {
        setAppliedApp(prev => [...prev, newApp])
    }

    const handleUpdate = (updatedApp: AppItem) => {

    }    

    return (
        <div className="container">
            <ApplicationForm onAdd={handleAdd}/>
            <ApplicationList applications={appliedApp} onUpdate={handleUpdate}/>
        </div>
    )
}

export default Home