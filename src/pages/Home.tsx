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
    console.log(appliedApp);
    
    
    useEffect(() => {
            localStorage.setItem("applied", JSON.stringify(appliedApp))
        }, [appliedApp])

    const handleAdd = (newApp: AppItem) => {
        setAppliedApp(prev => [...prev, newApp])
    }

    const handleDelete = (id: number) => {
        setAppliedApp(prev => prev.filter(a => a.id !== id))
    }

    const handleUpdate = (id: number, editedApplication: Partial<AppItem>) => {
        setAppliedApp(prev => prev.map(app => 
            app.id === id ? {...app, ...editedApplication} : app))
    }

    return (
        <div className="container">
            <ApplicationForm onAdd={handleAdd}/> 

            <ApplicationList applications={appliedApp} 
                             onUpdate={handleUpdate} 
                             onDelete={handleDelete}/>
        </div>
    )
}

export default Home