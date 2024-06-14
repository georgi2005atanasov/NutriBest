import { HOST } from "../utils/util";

export async function getFormFile(base64Image, imageData, fileName) {
    const response = await fetch(`${HOST}/Images`, {
        method: "GET",
        body: JSON.stringify({
            base64Image,
            imageData,
            fileName
        })
    });

    if (!response.ok) {
        return await response.text();
    }

    return await response.json();
}