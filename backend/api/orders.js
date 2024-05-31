import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function createGuestOrder(data) {
    const response = await fetch('https://localhost:7056/guestsOrders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    return await response.json();
}

export async function createUserOrder(data) {
    const token = getAuthToken();

    const response = await fetch('https://localhost:7056/usersOrders', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include"
    })

    return await response.json();
}

export async function getOrderById(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/orders/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}