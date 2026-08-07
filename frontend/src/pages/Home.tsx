import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem, CreateApplicationType } from "../types/AppType"
import "../css/Home.css"
import { useEffect, useState } from "react"
import { createApplication, deleteApplication, getApplications, updateApplication } from "../services/applicationService"
import SearchBar from "../components/SearchBar"

function Home () {

    const [appliedApp, setAppliedApp] = useState<AppItem[]>([])
    console.log(appliedApp);

    const [editingApp, setEditingApp] = useState<AppItem | null>(null)
    console.log(editingApp);

    const [searchText, setSearchText] = useState("")

    const loadApplications = async () => {
        try {
            const data = await getApplications();

            console.log("backend date:", data);
            
            setAppliedApp(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadApplications();
    }, [])
    
    const handleAdd = async (newApp: CreateApplicationType) => {
        await createApplication(newApp)
        await loadApplications()
    }

    const handleDelete = async (id: number) => {
        await deleteApplication(id)
        await loadApplications()
    }

    const handleUpdate = async (id: number, editedApplication: CreateApplicationType) => {
        await updateApplication(id, editedApplication)
        await loadApplications()
    }

    // for scrolling back to top + setEditingApp
    const handleEditClick = (app: AppItem) => {
        setEditingApp(app)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const filteredApps = appliedApp.filter((app) => {
        return app.companyName.toLowerCase().includes(searchText.toLowerCase())
    })

    console.log(filteredApps);
    
    return (
        <div className="container">
            <SearchBar 
                searchText={searchText} 
                setSearchText={setSearchText}
            />

            <ApplicationForm 
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onEditClick={editingApp}
                onClearEdit={() => setEditingApp(null)}
            /> 

            <ApplicationList 
                applications={filteredApps} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete}
                onEditClick={handleEditClick}
            />
        </div>
    )
}

export default Home