import ApplicationForm from "../components/ApplicationForm"
import ApplicationList from "../components/ApplicationList"
import type { AppItem } from "../types/AppType"
import "../css/Home.css"
import { useApplication } from "../contexts/AppliedApplicationContext"

function Home () {
    const {appliedApp, addApplication} = useApplication()
    
    const handleAdd = (newApp: AppItem) => {
        addApplication(newApp)
    }

    const handleUpdate = (updatedApp: AppItem) => {

    }
    console.log(appliedApp);
    

    return (
        <div className="container">
            <ApplicationForm onAdd={handleAdd}/>
            <ApplicationList applications={appliedApp} onUpdate={handleUpdate}/>
        </div>
    )
}

export default Home