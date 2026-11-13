const API_URL = "http://localhost:8080/api/auth";

export type AuthErrorKind = "invalid-credentials" | "unavailable";

export class AuthError extends Error {
    public readonly kind: AuthErrorKind;

    constructor(message: string, kind: AuthErrorKind) {
        super(message);
        this.name = "AuthError";
        this.kind = kind;
    }
}

const getCsrfToken = async (): Promise<string> => {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/csrf`, {
            credentials: "include"
        });
    } catch {
        throw new AuthError(
            "Cannot reach the server. Could not obtain a CSRF token.",
            "unavailable"
        );
    }

    if (!response.ok) {
        throw new AuthError("Could not obtain a CSRF token.", "unavailable");
    }

    const csrfCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

    if (!csrfCookie) {
        throw new AuthError("CSRF token cookie was not found.", "unavailable");
    }

    return decodeURIComponent(csrfCookie.substring("XSRF-TOKEN=".length));
};

export const getCsrfHeaders = async () => ({
    'X-XSRF-TOKEN': await getCsrfToken()
})

// Login function 
// This function sends a POST request to the server with the user's email and password
// It includes credentials in the request to allow the server to set cookies for session management
export const login = async (email: string, password: string) => {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...await getCsrfHeaders()
            },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new AuthError("Cannot reach the server. Check that the backend is running and try again.", "unavailable");
    }

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new AuthError("The email or password is incorrect. Please try again.", "invalid-credentials");
        }
        throw new AuthError("The server could not complete the login. Please try again later.", "unavailable");
    }

    await getCsrfToken(); // Fetch the CSRF token after a successful login

    return response;
};

// Register function
export const register = async (email: string, password: string) => {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/register`, {
            method: "POST",
            credentials: "include",     // Include credentials to allow the server to set cookies for session management
            headers: {
                "Content-Type": "application/json",
                ...await getCsrfHeaders()
            },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new AuthError(
            "Cannot reach the server. Check that the backend is running and try again.",
            "unavailable"
        );
    }

    if (response.status === 409) {
        throw new AuthError(
            "This email is already registered.",
            "invalid-credentials"
        );
    }

    if (!response.ok) {
        throw new AuthError(
            "Registration failed. Please try again later.",
            "unavailable"
        );
    }

    await login(email, password);

    return response;
};

// Returns false for a missing or expired session, and throws if the backend
// cannot be reached or reports a server error.
export const checkSession = async (): Promise<boolean> => {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/me`, {
            credentials: "include",
        });
    } catch {
        throw new AuthError("Cannot reach the server. The session could not be checked.", "unavailable");
    }

    if (response.status === 401 || response.status === 403) {
        return false;
    }
    if (!response.ok) {
        throw new AuthError("The server could not check your session. Please try again later.", "unavailable");
    }

    return true;
};


export const logout = async (): Promise<void> => {
    let response: Response;

    try {
        response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: await getCsrfHeaders()
        });
    } catch {
        throw new AuthError(
            "Cannot reach the server. Logout failed.",
            "unavailable"
        );
    }

    if (!response.ok) {
        throw new AuthError(
            "The server could not complete logout. Please try again.",
            "unavailable"
        );
    }

    await getCsrfToken(); // Fetch the CSRF token after a successful logout
};