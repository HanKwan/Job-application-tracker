import type { createApplicationType } from "../types/AppType";

const API_URL = "http://localhost:8080/api/applications";

export const getApplications = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }

    return response.json();
}

export const createApplication = async (application: createApplicationType) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(application)
    })

    return response.json()
}

// export const createApplication = async (application: createApplicationType) => {
//     const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(application)
//     })

//     return response.json()
// }