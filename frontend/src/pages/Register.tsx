import { useState } from "react";
import { AuthError, register } from "../services/authService";

type RegisterProps = {
    onRegisterSuccess: () => void;
};

function Register({ onRegisterSuccess }: RegisterProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            await register(email, password);
            onRegisterSuccess();
        } catch (error) {
            setErrorMessage(
                error instanceof AuthError
                    ? error.message
                    : "Registration failed unexpectedly. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <div className="auth-heading">
                    <h2 className="auth-title">Create your account</h2>
                    <p className="auth-description">
                        Start organizing your job search.
                    </p>
                </div>

                {errorMessage && (
                    <p className="auth-error" role="alert">
                        {errorMessage}
                    </p>
                )}

                <div className="auth-field">
                    <label className="auth-label" htmlFor="register-email">
                        Email
                    </label>
                    <input
                        className="auth-input"
                        id="register-email"
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
                    <label className="auth-label" htmlFor="register-password">
                        Password
                    </label>
                    <input
                        className="auth-input"
                        id="register-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        className="auth-input"
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </div>

                <button
                    className="auth-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}

export default Register;