import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem, createApplicationType } from "../types/AppType"
import "../css/Home.css"
import { useEffect, useState } from "react"
import { createApplication, deleteApplication, getApplications } from "../services/applicationService"

function Home () {

    const [appliedApp, setAppliedApp] = useState<AppItem[]>([])
    console.log(appliedApp);

    const [editingApp, setEditingApp] = useState<AppItem | null>(null)
    console.log(editingApp);

    const loadApplications = async () => {
        try {
            const data = await getApplications();
            setAppliedApp(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadApplications();
    }, [])
    
    const handleAdd = async (newApp: createApplicationType) => {
        await createApplication(newApp)
        await loadApplications()
    }

    const handleDelete = async (id: number) => {
        await deleteApplication(id)
        await loadApplications()
    }

    const handleUpdate = (id: number, editedApplication: Partial<AppItem>) => {
        setAppliedApp(prev => prev.map(app => 
            app.id === id ? {...app, ...editedApplication} : app))
    }

    // for scrolling back to top + setEditingApp
    const handleEditClick = (app: AppItem) => {
        setEditingApp(app)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="container">
            <ApplicationForm onAdd={handleAdd}
                             onUpdate={handleUpdate}
                             onEditClick={editingApp}
                             onClearEdit={() => setEditingApp(null)}/> 

            <ApplicationList applications={appliedApp} 
                             onUpdate={handleUpdate} 
                             onDelete={handleDelete}
                             onEditClick={handleEditClick}/>
        </div>
    )
}

export default Home