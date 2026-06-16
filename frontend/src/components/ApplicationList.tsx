import ApplicationItem from "./ApplicationItem"
import type { AppItem, createApplicationType } from "../types/AppType"
import "../css/AppList.css"

interface ApplicationProps {
    applications: AppItem[]
    onUpdate: (id: number, updatedApp: createApplicationType) => void
    onDelete: (id: number) => void
    onEditClick: (app: AppItem) => void 
}

const ApplicationList = ({ applications, onUpdate, onDelete, onEditClick }: ApplicationProps) => {

    return (
        <div className="app-list">
            {applications.map(app => 
                <ApplicationItem key={app.id} 
                                 app={app} 
                                 onUpdate={onUpdate} 
                                 onDelete={onDelete}
                                 onEditClick={onEditClick}/>
            )}
        </div>
    )

}

export default ApplicationList