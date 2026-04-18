import ApplicationItem from "./ApplicationItem"
import type { AppItem } from "../types/AppType"
import "../css/AppList.css"

interface ApplicationProps {
    applications: AppItem[]
    onUpdate: (id: number, updatedApp: Partial<AppItem>) => void
    onDelete: (id: number) => void
    onEditClick: (app: AppItem) => void 
}

const ApplicationList = ({ applications, onUpdate, onDelete, onEditClick }: ApplicationProps) => {

    return (
        <div className="app-list">
            <div className="app-list-header">
                <span>Company</span>
                <span>Position</span>
                <span>Status</span>
                <span>Date</span>
                <span>Actions</span>
            </div>
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