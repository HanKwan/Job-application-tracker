import type { AppItem } from "../../types/AppType";
import ApplicationItem from "../ApplicationItem";
import "../../css/board/ApplicationBoard.css";

interface ApplicationBoardProps {
    applications: AppItem[];
    onViewClick: (app: AppItem) => void;
}

const columns = [
    { title: "Wish List", statuses: ["Wish List"], color: "wishlist" },
    { title: "Applied", statuses: ["Applied"], color: "applied" },
    { title: "Screening", statuses: ["Screening"], color: "screening" },
    {
        title: "Interviewing",
        statuses: [
            "Interview-1",
            "Interview-2",
            "Interview-3",
            "Final-interview",
        ],
        color: "interviewing",
    },
    { title: "Offered", statuses: ["Offered"], color: "offered" },
    { title: "Rejected", statuses: ["Rejected"], color: "rejected" },
];

function ApplicationBoard({
    applications,
    onViewClick,
}: ApplicationBoardProps) {
    return (
        <div className="application-board">
            {columns.map((column) => {
                const columnApps = applications.filter((app) =>
                    column.statuses.includes(app.status)
                );

                return (
                    <div className={`application-column column-${column.color}`} key={column.title}>
                        <div className="column-header">
                            <h3>{column.title}</h3>
                            <span>{columnApps.length}</span>
                        </div>

                        <div className="column-content">
                            {columnApps.map((app) => (
                                <ApplicationItem
                                    key={app.id}
                                    app={app}
                                    onViewClick={onViewClick}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ApplicationBoard;