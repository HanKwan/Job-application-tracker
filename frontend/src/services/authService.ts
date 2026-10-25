const API_URL = "http://localhost:8080/api/auth";

// Login function 
// This function sends a POST request to the server with the user's email and password
// It includes credentials in the request to allow the server to set cookies for session management
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response;
};