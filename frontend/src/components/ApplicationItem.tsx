import "../css/AppItem.css";
import type { AppItem } from "../types/AppType";

interface ApplicationProps {
    app: AppItem;
    onViewClick: (app: AppItem) => void;
}

const ApplicationItem = ({ app, onViewClick }: ApplicationProps) => {
    return (
        <button
            type="button"
            className="app-item"
            onClick={() => onViewClick(app)}
        >
            <h3>{app.companyName}</h3>

            <p className="app-position">{app.position}</p>

            {app.applicationDate && (
                <p className="app-date">{app.applicationDate}</p>
            )}
        </button>
    );
};

export default ApplicationItem;