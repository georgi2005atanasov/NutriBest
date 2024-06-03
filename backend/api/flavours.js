import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allFlavours() {
    const response = await fetch(`https://localhost:7056/Flavours`);
    return await response.json();
}

export async function addFlavour(data) {
    const token = getAuthToken();

    const response = await fetch("https://localhost:7056/Flavours", {
        method: "POST",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function deleteFlavour(flavour) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Flavours/${flavour}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}