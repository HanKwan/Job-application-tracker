import "../css/AppItem.css"
import type { AppItem } from "../types/AppType"

interface ApplicationProps {
    app: AppItem
    onUpdate: (updatedApp: AppItem) => void
}

const ApplicationItem = ({ app, onUpdate }: ApplicationProps) => {

    const statuses = ["applied", "interview", "offer", "reject"]

    const handleUpdateStatus = (status: string) => {
        const update = {...app, status: status}

        onUpdate(update)
    }

    return (
        <div className="app-item">
            <span className="company">{app.company}</span>
            <span className="position">{app.position}</span>
            
            <select className={`status-${app.status}`}>
                {statuses.map(s => (
                    <option key={s} 
                            onClick={() => handleUpdateStatus(s)}>
                                {s}
                    </option>
                ))}
            </select>
            
            <span className="date">{app.date}</span>

            <div className="actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>
    )
}

export default ApplicationItem