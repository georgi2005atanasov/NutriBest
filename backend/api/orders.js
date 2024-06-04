import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function createGuestOrder(data) {
    const response = await fetch('https://localhost:7056/GuestsOrders', {
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

    const response = await fetch('https://localhost:7056/UsersOrders', {
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

    const response = await fetch(`https://localhost:7056/Orders/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: "include"
    })

    return response;
}

export async function confirmOrder(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Orders/Confirm?orderId=${id}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function allOrders() {
    const token = getAuthToken();

    if (token) {
        const response = await fetch("https://localhost:7056/Orders", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        return response;
    }
    
    return null;
}