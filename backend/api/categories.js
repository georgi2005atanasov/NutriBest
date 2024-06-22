import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allCategories() {
    const response = await fetch(`${HOST}/Categories`);

    return await response.json();
}

export async function addCategory(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Categories`, {
        method: "POST",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function deleteCategory(category) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Categories/${category}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}