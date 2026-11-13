import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import "../../css/layout/MainLayout.css";

type MainLayoutProps = {
    children: ReactNode;
    onLogout: () => void;
};

function MainLayout({ children, onLogout }: MainLayoutProps) {
    return (
        <div className="main-layout">
            <Sidebar onLogout={onLogout} />

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;