import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function getProfileDetails() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != null) {
        const response = await fetch(`${HOST}/Profile/Mine`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function editUser(data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Profile`, {
        method: "PUT",
        body: data,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export async function deleteUser() {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Profile`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export async function getUserAddress() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != null) {

        const response = await fetch(`${HOST}/Profile/Address`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function setUserAddress(data) {
    const token = getAuthToken();

    if (data.postalCode == "") {
        data.postalCode = null;
    }

    if (token != "EXPIRED" && token != null) {

        const response = await fetch(`${HOST}/Profile/Address`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    }

    return null;
}

export async function allProfiles(page, search, groupType) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    try {
        if (token != "EXPIRED" && token != null) {
            let endpoint = `${HOST}/Profiles?page=${page}&search=${search}`;
            if (groupType) {
                endpoint += `&groupType=${groupType}`
            }

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return await response.json();
        }

        return null;
    } catch (error) {
        return null;
    }
}

export async function getProfileDetailsById(id) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    try {
        if (token != "EXPIRED" && token != null) {

            const response = await fetch(`${HOST}/Profile/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            return await response.json();
        }

        return null;
    } catch (error) {
        return null;
    }
}