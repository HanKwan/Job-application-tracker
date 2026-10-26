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
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>

                {errorMessage && <p role="alert">{errorMessage}</p>}

                <div className="login-field">
                    <label className="login-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="login-input"
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="login-input"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button className="login-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
