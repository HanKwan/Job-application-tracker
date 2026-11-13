import {
    LayoutDashboard,
    ChartNoAxesColumn,
    Settings,
    LogOut,
    UserRound,
} from "lucide-react";
import "../../css/layout/Sidebar.css";

type SidebarProps = {
    onLogout: () => void;
};

function Sidebar({ onLogout }: SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">H</div>

                <nav className="sidebar-nav">
                    <button
                        type="button"
                        className="sidebar-nav-item active"
                        title="Board"
                        aria-label="Board"
                    >
                        <LayoutDashboard size={21} />
                    </button>

                    <button
                        type="button"
                        className="sidebar-nav-item"
                        title="Statistics (coming soon)"
                        aria-label="Statistics (coming soon)"
                        disabled
                    >
                        <ChartNoAxesColumn size={21} />
                    </button>

                    <button
                        type="button"
                        className="sidebar-nav-item"
                        title="Settings (coming soon)"
                        aria-label="Settings (coming soon)"
                        disabled
                    >
                        <Settings size={21} />
                    </button>
                </nav>
            </div>

            <div className="sidebar-bottom">
                <button
                    type="button"
                    className="sidebar-nav-item logout-item"
                    onClick={onLogout}
                    title="Logout"
                    aria-label="Logout"
                >
                    <LogOut size={20} />
                </button>

                <div className="sidebar-avatar" title="Profile">
                    <UserRound size={20} />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;