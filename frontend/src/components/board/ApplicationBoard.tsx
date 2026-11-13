import { useState } from "react";
import { createPortal } from "react-dom";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    KeyboardSensor,
    closestCorners,
    useSensor,
    useSensors,
    useDroppable,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import type { AppItem } from "../../types/AppType";
import ApplicationItem from "../ApplicationItem";
import "../../css/board/ApplicationBoard.css";

interface ApplicationBoardProps {
    applications: AppItem[];
    onViewClick: (app: AppItem) => void;
    onStatusChange: (app: AppItem, newStatus: string) => Promise<void>;
}

interface Column {
    title: string;
    statuses: string[];
    color: string;
}

const columns: Column[] = [
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

interface BoardColumnProps {
    column: Column;
    applications: AppItem[];
    onViewClick: (app: AppItem) => void;
}

function BoardColumn({
    column,
    applications,
    onViewClick,
}: BoardColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.title,
    });

    return (
        <div
            ref={setNodeRef}
            className={`application-column column-${column.color} ${
                isOver ? "is-over" : ""
            }`}
        >
            <div className="column-header">
                <h3>{column.title}</h3>
                <span>{applications.length}</span>
            </div>

            <div className="column-content">
                {applications.map((app) => (
                    <ApplicationItem
                        key={app.id}
                        app={app}
                        onViewClick={onViewClick}
                    />
                ))}
            </div>
        </div>
    );
}

function ApplicationBoard({
    applications,
    onViewClick,
    onStatusChange,
}: ApplicationBoardProps) {
    const [activeApp, setActiveApp] = useState<AppItem | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        const draggedApp = applications.find(
            (app) => app.id === Number(event.active.id)
        );

        setActiveApp(draggedApp ?? null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const draggedApp = applications.find(
            (app) => app.id === Number(active.id)
        );

        const targetColumn = columns.find(
            (column) => column.title === over.id
        );

        if (!draggedApp || !targetColumn) return;

        const currentColumn = columns.find((column) =>
            column.statuses.includes(draggedApp.status)
        );

        if (currentColumn?.title === targetColumn.title) return;

        const newStatus =
            targetColumn.title === "Interviewing"
                ? "Interview-1"
                : targetColumn.statuses[0];

        void onStatusChange(draggedApp, newStatus);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={(event) => {
                handleDragEnd(event);
                setActiveApp(null);
            }}
            onDragCancel={() => setActiveApp(null)}
        >
            <div className="application-board">
                {columns.map((column) => {
                    const columnApps = applications.filter((app) =>
                        column.statuses.includes(app.status)
                    );

                    return (
                        <BoardColumn
                            key={column.title}
                            column={column}
                            applications={columnApps}
                            onViewClick={onViewClick}
                        />
                    );
                })}
            </div>

            {createPortal(
                <DragOverlay zIndex={1000}>
                    {activeApp ? (
                        <ApplicationItem
                            app={activeApp}
                            onViewClick={onViewClick}
                            isOverlay
                        />
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
}

export default ApplicationBoard;