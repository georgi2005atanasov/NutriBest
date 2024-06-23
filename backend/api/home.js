import { HOST } from "../utils/util";

export async function getContactDetails() {
    const response = await fetch(`${HOST}/Home/ContactUs`, {
        method: "GET"
    });

    return await response.json();
}