import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allPromoCodes() {
    const response = await fetch(`${HOST}/PromoCode`, {
        method: "GET"
    });

    return response;
}

export async function deletePromoCodes(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/PromoCode`, {
        method: "DELETE",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function createPromoCodes(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/PromoCode`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}