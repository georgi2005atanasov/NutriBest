export async function allBrands() {
    const response = await fetch(`https://localhost:7056/brands`, {
        method: "GET"
    });

    return await response.json();
}