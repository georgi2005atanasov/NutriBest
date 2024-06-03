import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function getNutritionFactsByProductIdAndName(id, name) {
    const response = await fetch(`https://localhost:7056/Products/nutri-facts/${id}/${name}`, {
        method: "GET"
    });

    return await response.json();
}

export async function setNutritionFactsByProductId(id, data) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Products/nutri-facts/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}