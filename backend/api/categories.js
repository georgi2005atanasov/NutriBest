export async function allCategories() {
    const response = await fetch(`https://localhost:7056/categories`);

    return await response.json();
}