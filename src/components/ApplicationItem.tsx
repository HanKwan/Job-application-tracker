import "../css/AppItem.css"
import type { AppItem } from "../types/AppType"

interface ApplicationProps {
    app: AppItem
    onUpdate: (id: number, updatedApp: Partial<AppItem>) => void
    onDelete: (id: number) => void
}

const ApplicationItem = ({ app, onUpdate, onDelete }: ApplicationProps) => {

    const statuses = ["applied", "interview", "offer", "reject"]

    return (
        <div className="app-item">
            <span className="company">{app.company}</span>
            <span className="position">{app.position}</span>
            
            <select className={`status-${app.status}`} 
                    value={app.status} 
                    onChange={(e) => onUpdate(app.id, {status: e.target.value})}>

                {statuses.map(s => (
                    <option key={s} 
                            value={s}>
                                {s}
                    </option>
                ))}
            </select>
            
            <span className="date">{app.date}</span>

            <div className="actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => onDelete(app.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ApplicationItem