import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allPackages(requiredVerification) {
    if (requiredVerification) {
        const token = getAuthToken();
        const { isAdmin, isEmployee } = useAuth(token);

        if (!isAdmin && !isEmployee) {
            return null;
        }
    }

    const response = await fetch(`${HOST}/Packages`);
    return await response.json();
}

export async function addPackage(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Packages`, {
        method: "POST",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function deletePackage(packageName) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Packages/${packageName}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}