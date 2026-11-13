import type { AppItem } from "../../types/AppType";
import ApplicationItem from "../ApplicationItem";

interface ApplicationBoardProps {
    applications: AppItem[];
    onViewClick: (app: AppItem) => void;
}

const columns = [
    { title: "Wish List", statuses: ["Wish List"] },
    { title: "Applied", statuses: ["Applied"] },
    { title: "Screening", statuses: ["Screening"] },
    {
        title: "Interviewing",
        statuses: [
            "Interview-1",
            "Interview-2",
            "Interview-3",
            "Final-interview",
        ],
    },
    { title: "Offered", statuses: ["Offered"] },
    { title: "Rejected", statuses: ["Rejected"] },
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
                    <div className="application-column" key={column.title}>
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