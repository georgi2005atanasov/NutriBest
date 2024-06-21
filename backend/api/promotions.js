import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allPromotions(requiredVerification) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (requiredVerification && !isAdmin && !isEmployee) {
        return null;
    }

    try {
        const response = await fetch(`${HOST}/Promotions`);
        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function changeProductPromotion(promotionId, productId) {
    const token = getAuthToken();

    if (!promotionId) {
        const response = await fetch(`${HOST}/Promotions/RemoveProductPromotion/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return await response.json();
    } else {
        const response = await fetch(`${HOST}/Promotions/AddProductPromotion/${promotionId}/${productId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return await response.json();
    }
}

export async function addPromotion(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Promotions`,
        {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return await response.json();
}

export async function changeStatus(promotionId) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Promotions/Status/${promotionId}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return response;
}

export async function getPromotionById(promotionId) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    const response = await fetch(`${HOST}/Promotions/${promotionId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return await response.json();
}

export async function editPromotion(promotionId, data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Promotions/${promotionId}`,
        {
            method: "PUT",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    if (response.ok) {
        return response;
    }
    else {
        return await response.json();
    }
}

export async function deletePromotion(promotionId) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Promotions/${promotionId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return await response.json();
}

export async function getProductsOfPromotion(promotionId) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Promotions/${promotionId}/Products`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return await response.json();
}

export async function exportPromotions() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Promotions/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}