import { HOST } from "../utils/util";

export async function addToNewsletter(data) {
    const result = await fetch(`${HOST}/Newsletter`, {
        method: "POST",
        body: data
    });

    return result;
}