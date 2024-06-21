import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allFlavours(requiredVerification) {
    if (requiredVerification) {
        const token = getAuthToken();
        const {isAdmin, isEmployee} = useAuth(token);

        if (!isAdmin && !isEmployee) {
            return null;
        }
     }

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

export async function exportFlavours() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Flavours/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}