const API_URL = "http://localhost:8080/api/applications";

export const getApplications = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }
}