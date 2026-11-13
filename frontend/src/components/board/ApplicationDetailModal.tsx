import { useEffect } from "react";
import type { AppItem } from "../../types/AppType";
import "../../css/board/ApplicationDetailModal.css";

interface ApplicationDetailModalProps {
    app: AppItem;
    onClose: () => void;
}

function ApplicationDetailModal({
    app,
    onClose,
}: ApplicationDetailModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="detail-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="detail-modal-header">
                    <h2 id="detail-modal-title">{app.companyName}</h2>

                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                <div className="detail-modal-content">
                    <div className="detail-field">
                        <span>Position</span>
                        <p>{app.position}</p>
                    </div>

                    <div className="detail-field">
                        <span>Status</span>
                        <p>{app.status}</p>
                    </div>

                    {app.applicationDate && (
                        <div className="detail-field">
                            <span>Application date</span>
                            <p>{app.applicationDate}</p>
                        </div>
                    )}

                    {app.note && (
                        <div className="detail-field">
                            <span>Notes</span>
                            <p className="detail-note">{app.note}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ApplicationDetailModal;