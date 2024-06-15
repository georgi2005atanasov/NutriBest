import Search from "../../frontend/nutri-best-project/src/components/UI/Searchbar/Search";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function addToNewsletter(data) {
    const response = await fetch(`${HOST}/Newsletter`, {
        method: "POST",
        body: data
    });

    return response;
}

export async function subscribedToNewsletter(page, search = "", groupType) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Newsletter?page=${page}&search=${search}&type=${groupType}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}