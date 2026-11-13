import { useDraggable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import "../css/AppItem.css";
import type { AppItem } from "../types/AppType";

interface ApplicationProps {
    app: AppItem;
    onViewClick: (app: AppItem) => void;
    isOverlay?: boolean;
}

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

            {app.applicationDate && (
                <p className="app-date">{app.applicationDate}</p>
            )}
        </button>
    );
};

export default ApplicationItem;