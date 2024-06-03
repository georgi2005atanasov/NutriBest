import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function getProfileDetails() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != null) {

        const response = await fetch(`https://localhost:7056/Profile/Mine`, {
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

    const response = await fetch(`https://localhost:7056/Profile`, {
        method: "PUT",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export async function deleteUser() {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Profile`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export async function getUserAddress() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != null) {

        const response = await fetch(`https://localhost:7056/Profile/Address`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function setUserAddress(data) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != null) {

        const response = await fetch(`https://localhost:7056/Profile/Address`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    }

    return null;
}