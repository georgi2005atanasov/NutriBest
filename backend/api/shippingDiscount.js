import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function createShippingDiscount(shippingDiscount) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/ShippingDiscount`, {
        method: "POST",
        body: JSON.stringify(shippingDiscount),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function deleteShippingDiscount(countryName) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/ShippingDiscount`, {
        method: "DELETE",
        body: JSON.stringify({ 
            countryName 
        }),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return await response.json();
}

export async function allShippingDiscounts() {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/ShippingDiscount/All`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}