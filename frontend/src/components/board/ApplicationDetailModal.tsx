import { useEffect, useState } from "react";
import type { AppItem, CreateApplicationType } from "../../types/AppType";
import "../../css/board/ApplicationDetailModal.css";

interface ApplicationDetailModalProps {
    app: AppItem;
    onClose: () => void;
    onUpdate: (
        id: number,
        updatedApp: CreateApplicationType,
    ) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

function ApplicationDetailModal({
    app,
    onClose,
    onUpdate,
    onDelete,
}: ApplicationDetailModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentApp, setCurrentApp] = useState(app);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [companyName, setCompanyName] = useState(app.companyName);
    const [position, setPosition] = useState(app.position);
    const [status, setStatus] = useState(app.status);
    const [applicationDate, setApplicationDate] = useState(
        app.applicationDate ?? "",
    );
    const [note, setNote] = useState(app.note);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleEdit = () => {
        setCompanyName(currentApp.companyName);
        setPosition(currentApp.position);
        setStatus(currentApp.status);
        setApplicationDate(currentApp.applicationDate ?? "");
        setNote(currentApp.note);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);

        if (newStatus === "Wish List") {
            setApplicationDate("");
        } else if (!applicationDate) {
            setApplicationDate(new Date().toISOString().split("T")[0]);
        }
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!companyName.trim()) return;

        if (status !== "Wish List" && !applicationDate) {
            return;
        }

        const updatedData: CreateApplicationType = {
            companyName: companyName.trim(),
            position: position.trim(),
            status,
            applicationDate: status === "Wish List" ? null : applicationDate,
            note,
        };

        try {
            setIsSaving(true);

            await onUpdate(currentApp.id, updatedData);

            setCurrentApp({
                ...currentApp,
                ...updatedData,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update application:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(currentApp.id);
            onClose();
        } catch (error) {
            console.error("Failed to delete application:", error);
        } finally {
            setIsDeleting(false);
        }
    };

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
                    <h2 id="detail-modal-title">
                        {isEditing ? "Edit Application" : currentApp.companyName}
                    </h2>

                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {isEditing ? (
                    <form className="detail-modal-content" onSubmit={handleSave}>
                        <div className="detail-field">
                            <label htmlFor="edit-company-name">Company name</label>
                            <input
                                id="edit-company-name"
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="detail-field">
                            <label htmlFor="edit-position">Position</label>
                            <input
                                id="edit-position"
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>

                        <div className="detail-field">
                            <label htmlFor="edit-status">Status</label>
                            <select
                                id="edit-status"
                                value={status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                            >
                                <option value="Wish List">Wish List</option>
                                <option value="Applied">Applied</option>
                                <option value="Screening">Screening</option>
                                <option value="Interview-1">Interview-1</option>
                                <option value="Interview-2">Interview-2</option>
                                <option value="Interview-3">Interview-3</option>
                                <option value="Final-interview">Final-interview</option>
                                <option value="Offered">Offered</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="detail-field">
                            <label htmlFor="edit-date">Application date</label>
                            <input
                                id="edit-date"
                                type="date"
                                value={applicationDate}
                                onChange={(e) => setApplicationDate(e.target.value)}
                                required={status !== "Wish List"}
                                disabled={status === "Wish List"}
                            />
                        </div>

                        <div className="detail-field">
                            <label htmlFor="edit-note">Notes</label>
                            <textarea
                                id="edit-note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        <div className="detail-modal-actions">
                            <button
                                type="button"
                                className="modal-btn modal-btn-secondary"
                                onClick={handleCancel}
                                disabled={isSaving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="modal-btn modal-btn-primary"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </form>
                ) : showDeleteConfirm ? (
                    <div className="delete-confirm-content">
                        <h3>Delete Application?</h3>
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{currentApp.companyName}</strong>?
                        </p>
                        <p className="delete-warning">
                            This action cannot be undone.
                        </p>

                        <div className="delete-confirm-actions">
                            <button
                                type="button"
                                className="modal-btn modal-btn-secondary"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                            >
                                Keep application
                            </button>

                            <button
                                type="button"
                                className="modal-btn modal-btn-danger"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Confirm delete"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="detail-modal-content">
                            <div className="detail-field">
                                <span>Position</span>
                                <p>{currentApp.position || "Not specified"}</p>
                            </div>

                            <div className="detail-field">
                                <span>Status</span>
                                <p>{currentApp.status}</p>
                            </div>

                            {currentApp.applicationDate && (
                                <div className="detail-field">
                                    <span>Application date</span>
                                    <p>{currentApp.applicationDate}</p>
                                </div>
                            )}

                            {currentApp.note && (
                                <div className="detail-field">
                                    <span>Notes</span>
                                    <p className="detail-note">{currentApp.note}</p>
                                </div>
                            )}
                        </div>

                        <div className="detail-modal-actions">
                            <button
                                type="button"
                                className="modal-btn modal-btn-danger-outline"
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={isDeleting}
                            >
                                Delete
                            </button>

                            <button
                                type="button"
                                className="modal-btn modal-btn-primary"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ApplicationDetailModal;