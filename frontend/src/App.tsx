import { useEffect, useState } from "react";
import "./css/App.css";
import "./css/Auth.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthError, checkSession, logout } from "./services/authService";

type AuthMode = "login" | "register";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [sessionError, setSessionError] = useState("");
    const [authMode, setAuthMode] = useState<AuthMode>("login");

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            setAuthMode("login");
            setSessionError("");
        } catch (error: unknown) {
            setSessionError(
                error instanceof AuthError
                    ? error.message
                    : "Logout failed. Please try again.",
            );
        }
    };

    useEffect(() => {
        let isMounted = true;

        checkSession()
            .then((hasSession) => {
                if (isMounted) setIsAuthenticated(hasSession);
            })
            .catch((error: unknown) => {
                if (isMounted) {
                    setSessionError(
                        error instanceof AuthError
                            ? error.message
                            : "The session could not be checked. Please try again.",
                    );
                }
            })
            .finally(() => {
                if (isMounted) setIsCheckingSession(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    if (isCheckingSession) {
        return (
            <main className="app-shell">
                <p role="status">Checking your session...</p>
            </main>
        );
    }

    if (isAuthenticated) {
        return <Home onLogout={handleLogout} />;
    }

    return (
        <main className="app-shell auth-shell">
            <header className="app-header">
                <h1 className="app-title">Job Tracker</h1>
                <p className="app-subtitle">
                    Keep your job search organized.
                </p>
            </header>

            {sessionError && (
                <p className="auth-error" role="alert">
                    {sessionError}
                </p>
            )}

            {authMode === "login" ? (
                <>
                    <Login
                        onLoginSuccess={() => {
                            setSessionError("");
                            setIsAuthenticated(true);
                        }}
                    />

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setSessionError("");
                                setAuthMode("register");
                            }}
                        >
                            Register
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <Register
                        onRegisterSuccess={() => {
                            setSessionError("");
                            setIsAuthenticated(true);
                        }}
                    />

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setSessionError("");
                                setAuthMode("login");
                            }}
                        >
                            Login
                        </button>
                    </p>
                </>
            )}
        </main>
    );
}

export default App;