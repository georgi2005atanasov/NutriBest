import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function grantUser(id, role) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Admin/Grant/${id}?role=${role}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function disownUser(id, role) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Admin/Disown/${id}?role=${role}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function restoreProfile(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Admin/Restore/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}