import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allPromoCodes() {
    const response = await fetch(`https://localhost:7056/PromoCode`, {
        method: "GET"
    });

    return response;
}

export async function deletePromoCodes(data) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/PromoCode`, {
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

    const response = await fetch(`https://localhost:7056/PromoCode`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}