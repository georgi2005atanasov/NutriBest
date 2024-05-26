import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allPromoCodes() {
    const response = await fetch(`https://localhost:7056/promoCode`, {
        method: "GET"
    });

    return response;
}