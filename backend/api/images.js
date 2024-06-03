export async function getFormFile(base64Image, imageData, fileName) {
    const response = await fetch(`https://localhost:7056/Images`, {
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