import "../css/AppItem.css"
import type { AppItem, createApplicationType } from "../types/AppType"

interface ApplicationProps {
    app: AppItem
    onUpdate: (id: number, updatedApp: createApplicationType) => void
    onDelete: (id: number) => void
    onEditClick: (app: AppItem) => void
}

const ApplicationItem = ({ app, onUpdate, onDelete, onEditClick }: ApplicationProps) => {

    const statuses = ["Applied",
                        "Screening",
                        "Interview-1", 
                        "Interview-2", 
                        "Interview-3", 
                        "Final-interview", 
                        "Offered", 
                        "Rejected"]

    return (
        <div className="app-item">
            <p><strong>Company's name:</strong> {app.companyName}</p>

            <p>
                <strong>Position:</strong> {app.position} | {" "}
                <strong>Date:</strong> {app.applicationDate}
            </p>

            <div className="status-container">
                <strong>Status:</strong>
            
                <select className={`status-${app.status}`} 
                        value={app.status} 
                        onChange={(e) => onUpdate(app.id, {
                            companyName: app.companyName,
                            position: app.position,
                            status: e.target.value,
                            note: app.note,
                            applicationDate: app.applicationDate
                        })}>

                    {statuses.map(s => (
                        <option key={s} 
                                value={s}>
                                    {s}
                        </option>
                    ))}
                </select>
            </div>
            
            {app.note && (
                <p className="note">{app.note}</p>
            )}

            <div className="actions">
                <button className="edit-btn" onClick={() => onEditClick(app)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(app.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ApplicationItem