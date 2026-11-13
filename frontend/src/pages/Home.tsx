import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationBoard from "../components/board/ApplicationBoard";
import ApplicationDetailModal from "../components/board/ApplicationDetailModal";
import SearchBar from "../components/SearchBar";
import type { AppItem, CreateApplicationType } from "../types/AppType";
import "../css/Home.css";
import {
    createApplication,
    deleteApplication,
    getApplications,
    updateApplication,
} from "../services/applicationService";

type HomeProps = {
    onLogout: () => void;
};

function Home({ onLogout }: HomeProps) {
    const [appliedApp, setAppliedApp] = useState<AppItem[]>([]);
    const [editingApp, setEditingApp] = useState<AppItem | null>(null);
    const [searchText, setSearchText] = useState("");
    const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const loadApplications = async () => {
        try {
            const data = await getApplications();
            setAppliedApp(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    useEffect(() => {
        if (!isAddModalOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsAddModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAddModalOpen]);

    const handleAdd = async (newApp: CreateApplicationType) => {
        await createApplication(newApp);
        await loadApplications();
        setIsAddModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        await deleteApplication(id);
        await loadApplications();
    };

    const handleUpdate = async (
        id: number,
        editedApplication: CreateApplicationType,
    ) => {
        await updateApplication(id, editedApplication);
        await loadApplications();
    };

    const handleEditClick = (app: AppItem) => {
        setEditingApp(app);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const filteredApps = appliedApp.filter((app) => {
        return app.companyName
            .toLowerCase()
            .includes(searchText.toLowerCase());
    });

    return (
        <MainLayout onLogout={onLogout}>
            <div className="container">
                <div className="home-toolbar">
                    <SearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                    />

                    <button
                        type="button"
                        className="add-application-btn"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        + Add Application
                    </button>
                </div>

                <ApplicationBoard
                    applications={filteredApps}
                    onViewClick={setSelectedApp}
                />
            </div>

            {isAddModalOpen && (
                <div
                    className="add-modal-overlay"
                    onClick={() => setIsAddModalOpen(false)}
                >
                    <div
                        className="add-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="add-modal-header">
                            <h2>Add Application</h2>

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setIsAddModalOpen(false)}
                                aria-label="Close add application form"
                            >
                                ×
                            </button>
                        </div>

                        <ApplicationForm
                            onAdd={handleAdd}
                            onUpdate={handleUpdate}
                            onEditClick={editingApp}
                            onClearEdit={() => setEditingApp(null)}
                        />
                    </div>
                </div>
            )}

            {selectedApp && (
                <ApplicationDetailModal
                    app={selectedApp}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </MainLayout>
    );
}

export default Home;