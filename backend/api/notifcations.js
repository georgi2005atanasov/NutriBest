import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allNotifications(page) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Notifications?page=${page}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function deleteNotification(message) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Notifications/${message}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}