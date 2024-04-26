import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function getProfileDetails() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch(`https://localhost:7056/profile/mine`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function editUser(data) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/profile`, {
        method: "PUT",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}