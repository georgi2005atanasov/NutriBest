import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allPackages() {
    const response = await fetch(`https://localhost:7056/packages`);

    return await response.json();
}

export async function addPackage(data) {
    const token = getAuthToken();

    const response = await fetch("https://localhost:7056/packages", {
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

    const response = await fetch(`https://localhost:7056/packages/${packageName}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}