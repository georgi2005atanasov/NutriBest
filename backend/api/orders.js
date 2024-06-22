import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function createGuestOrder(data) {
    const response = await fetch(`${HOST}/GuestsOrders`, {
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

    const response = await fetch(`${HOST}/UsersOrders`, {
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

    const response = await fetch(`${HOST}/Orders/${id}`, {
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

    const response = await fetch(`${HOST}/Orders/Confirm?orderId=${id}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function allOrders(page, search, filters, startDate, endDate) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    if (token) {
        let endpoint = `${HOST}/Orders?page=${page}&search=${search}`;

        if (filters) {
            endpoint += `&filters=${filters}`;
        }
        if (startDate) {
            endpoint += `&startDate=${encodeURIComponent(startDate)}`
        }
        if (endDate) {
            endpoint += `&endDate=${encodeURIComponent(endDate)}`
        }

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
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

    const response = await fetch(`${HOST}/Orders/Admin/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function changeOrderStatuses(id, isFinished, isPaid, isShipped, isConfirmed) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Orders/ChangeStatus/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            isPaid,
            isFinished,
            isShipped,
            isConfirmed
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

    const response = await fetch(`${HOST}/Orders/Admin/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return response;
}

export async function getOrderRelatedProducts(price) {
    const response = await fetch(`${HOST}/Orders/RelatedProducts?price=${price}`, {
        method: 'GET'
    })

    return response;
}