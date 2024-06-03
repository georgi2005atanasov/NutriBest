import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allPromotions() {
    try {
        const response = await fetch(`https://localhost:7056/Promotions`);
        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function changeProductPromotion(promotionId, productId) {
    const token = getAuthToken();

    if (!promotionId) {
        const response = await fetch(`https://localhost:7056/Promotions/remove-product-promotion/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return await response.json();
    } else {
        const response = await fetch(`https://localhost:7056/Promotions/add-product-promotion/${promotionId}/${productId}`,
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

    const response = await fetch(`https://localhost:7056/Promotions`,
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

    const response = await fetch(`https://localhost:7056/Promotions/Status/${promotionId}`,
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

    const response = await fetch(`https://localhost:7056/Promotions/${promotionId}`,
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

    const response = await fetch(`https://localhost:7056/Promotions/${promotionId}`,
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

    const response = await fetch(`https://localhost:7056/Promotions/${promotionId}`,
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

    const response = await fetch(`https://localhost:7056/Promotions/${promotionId}/products`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    return await response.json();
}