import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function addProduct(productModel) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch("https://localhost:7056/products", {
            method: "POST",
            body: productModel,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return await response.text();
        }

        return await response.json();
    }
    else {
        throw Error("Token expired!")
    }
}

export async function allProducts(page, categories = "", price = "") {
    let query = `?page=${page}`;
    if (categories && categories != "") {
        query += `&categories=${categories}`;
    }
    if (price && price != "") {
        query += `&price=${price}`;
    }

    const response = await fetch(`https://localhost:7056/products${query}`, {
        method: "GET"
    });

    return response;
}

export async function getProductsByCategories() {
    const response = await fetch(`https://localhost:7056/products/by-category-count`, {
        method: "GET"
    });

    return await response.json();
}