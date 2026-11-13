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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        <div className="register-page">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Create Account</h2>

                {errorMessage && <p role="alert">{errorMessage}</p>}

                <div className="register-field">
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating account..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;