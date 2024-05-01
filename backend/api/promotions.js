import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allPromotions() {
    try {
        const response = await fetch(`https://localhost:7056/promotions`);
        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function changeProductPromotion(promotionId, productId) {
    const token = getAuthToken();

    if (!promotionId) {
        const response = await fetch(`https://localhost:7056/promotions/remove-product-promotion/${productId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return await response.json();
    } else {
        const response = await fetch(`https://localhost:7056/promotions/add-product-promotion/${promotionId}/${productId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return await response.json();
    }
}