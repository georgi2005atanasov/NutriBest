import Search from "../../frontend/nutri-best-project/src/components/UI/Searchbar/Search";
import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function addToNewsletter(data) {
    const response = await fetch(`${HOST}/Newsletter`, {
        method: "POST",
        body: data
    });

    return response;
}

export async function removeFromNewsletterByAdmin(email) {
    const token = getAuthToken();

    const data = new FormData();
    data.append("email", email);

    const response = await fetch(`${HOST}/Newsletter/Admin/RemoveFromNewsletter`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data
    });

    return await response.json();
}

export async function unsubscribeFromNewsletter(email) {
    const token = getAuthToken();

    const data = new FormData();
    data.append("email", email);

    const response = await fetch(`${HOST}/Newsletter/RemoveFromNewsletter`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data
    });

    return await response.json();
}

export async function subscribedToNewsletter(page, search = "", groupType) {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    const response = await fetch(`${HOST}/Newsletter?page=${page}&search=${search}&groupType=${groupType}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

