import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>

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

                <button className="login-button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;