import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function getNutritionFactsByProductIdAndName(id, name) {
    const response = await fetch(`${HOST}/Products/NutriFacts/${id}/${name}`, {
        method: "GET"
    });

    return await response.json();
}

export async function setNutritionFactsByProductId(id, data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Products/NutriFacts/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}