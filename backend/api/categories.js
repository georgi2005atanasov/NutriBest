import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allCategories() {
    const response = await fetch(`https://localhost:7056/Categories`);

    return await response.json();
}

export async function addCategory(data) {
    const token = getAuthToken();

    const response = await fetch("https://localhost:7056/Categories", {
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

    const response = await fetch(`https://localhost:7056/Categories/${category}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}