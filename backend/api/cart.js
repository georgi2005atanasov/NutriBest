import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function addToCart(productId, count) {
    const token = getAuthToken();

    if (!token || token == "EXPIRED") {
        const response = await fetch(`https://localhost:7056/cart/guest/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId,
                count
            }),
            credentials: "include"
        });

        return response;
    }

    const response = await fetch(`https://localhost:7056/cart/user/add`, {
        method: "POST",
        body: JSON.stringify({
            productId,
            count
        }),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response;
}
