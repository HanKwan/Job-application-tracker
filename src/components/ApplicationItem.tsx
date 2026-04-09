import "../css/AppItem.css"
import type { AppItem } from "../types/AppType"

interface ApplicationProps {
    app: AppItem
    onUpdate: (updatedApp: AppItem) => void
}

const ApplicationItem = ({ app }: ApplicationProps) => {

    

    return (
        <div className="app-item">
            <span className="company">{app.company}</span>
            <span className="position">{app.position}</span>
            
            <div className="status applied">
                {}
            </div>
            
            <span className="date">{app.date}</span>

            <div className="actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>
    )
}

export default ApplicationItem