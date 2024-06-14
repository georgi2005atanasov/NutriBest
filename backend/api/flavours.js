import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allFlavours() {
    const response = await fetch(`${HOST}/Flavours`);
    return await response.json();
}

export async function addFlavour(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Flavours`, {
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

    const response = await fetch(`${HOST}/Flavours/${flavour}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}