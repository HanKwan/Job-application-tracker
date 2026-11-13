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

    const handleAdd = async (newApp: CreateApplicationType) => {
        await createApplication(newApp);
        await loadApplications();
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
                <ApplicationForm
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onEditClick={editingApp}
                    onClearEdit={() => setEditingApp(null)}
                />

                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ApplicationBoard
                    applications={filteredApps}
                    onViewClick={setSelectedApp}
                />
            </div>

            {selectedApp && (
                <ApplicationDetailModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                />
            )}
        </MainLayout>
    );
}

export default Home;