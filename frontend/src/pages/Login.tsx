import { useState } from "react";
import { AuthError, login } from "../services/authService";

type LoginProps = {
    onLoginSuccess: () => void;
};

function Login({ onLoginSuccess }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            await login(email, password);
            onLoginSuccess();
        } catch (error) {
            setErrorMessage(
                error instanceof AuthError
                    ? error.message
                    : "Login failed unexpectedly. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-heading">
                    <h2 className="auth-title">Welcome back</h2>
                    <p className="auth-description">
                        Sign in to continue tracking your applications.
                    </p>
                </div>

                {errorMessage && (
                    <p className="auth-error" role="alert">
                        {errorMessage}
                    </p>
                )}

                <div className="auth-field">
                    <label className="auth-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="auth-input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="auth-input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button
                    className="auth-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
