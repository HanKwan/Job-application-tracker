import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import "../css/AppItem.css";
import type { AppItem } from "../types/AppType";

interface ApplicationProps {
    app: AppItem;
    onViewClick: (app: AppItem) => void;
    isOverlay?: boolean;
}

const interviewStages: Record<string, { label: string; color: string }> = {
    "Interview-1": {
        label: "Interview 1",
        color: "interview-1",
    },
    "Interview-2": {
        label: "Interview 2",
        color: "interview-2",
    },
    "Interview-3": {
        label: "Interview 3",
        color: "interview-3",
    },
    "Final-interview": {
        label: "Final Interview",
        color: "final-interview",
    },
};

const ApplicationItem = ({
        app,
        onViewClick,
        isOverlay = false,
    }: ApplicationProps) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            isDragging,
        } = useDraggable({
            id: app.id,
            disabled: isOverlay,
        });

const dragStyle: CSSProperties = isOverlay
    ? {
            opacity: 1,
            cursor: "grabbing",
            transform: "none",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
        }
    : {
            transform: transform
                ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                : undefined,
            opacity: isDragging ? 0.25 : 1,
        };

const interviewStage = interviewStages[app.status];

    return (
        <button
            ref={setNodeRef}
            type="button"
            className={`app-item ${isOverlay ? "app-item-overlay" : ""}`}
            style={dragStyle}
            onClick={() => onViewClick(app)}
            {...attributes}
            {...listeners}
        >
            <h3>{app.companyName}</h3>

            <p className="app-position">{app.position}</p>

            {interviewStage && (
                <span className={`interview-badge ${interviewStage.color}`}>
                    {interviewStage.label}
                </span>
            )}

            {app.applicationDate && (
                <p className="app-date">{app.applicationDate}</p>
            )}
        </button>
    );
};

export default ApplicationItem;