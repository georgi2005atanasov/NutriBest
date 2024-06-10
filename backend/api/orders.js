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

export async function allOrders(page, search) {
    const token = getAuthToken();

    if (token) {
        const response = await fetch(`https://localhost:7056/Orders?page=${page}&search=${search}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        return response;
    }

    return null;
}

export async function getUserOrders(page, search) {
    const token = getAuthToken();

    if (token) {
        const response = await fetch(`https://localhost:7056/Orders/Mine?page=${page}&search=${search ? search : ""}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        return response;
    }

    return null;
}

export async function getOrderByAdmin(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Orders/Admin/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function changeOrderStatuses(id, isFinished, isPaid, isShipped) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Orders/change-status/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            isPaid,
            isFinished,
            isShipped
        }),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return response;
}

export async function deleteOrder(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Orders/Admin/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function getOrderRelatedProducts() {
    const response = await fetch(`https://localhost:7056/Orders/RelatedProducts`, {
        method: 'GET'
    })

    return response;
}