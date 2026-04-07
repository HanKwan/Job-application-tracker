import "../css/AppItem.css"
import type { AppItem } from "../types/AppType"

interface ApplicationProps {
    app: AppItem
}

const ApplicationItem = ({ app }: ApplicationProps) => {


    return (
        <div className="app-item">
            <span className="company">Google</span>
            <span className="position">Frontend Dev</span>
            <span className="status applied">Applied</span>
            <span className="date">2026-04-06</span>

            <div className="actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>
    )
}

export default ApplicationItem