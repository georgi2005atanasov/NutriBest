import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { buildQuery } from "../../frontend/nutri-best-project/src/utils/utils";

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

export async function allProducts(page, categories = "", price = "", alpha = "") {
    const query = buildQuery(page, categories, price, alpha);

    const response = await fetch(`https://localhost:7056/products${query}`, {
        method: "GET"
    });

    return response;
}

export async function getProductById(id) {
    const response = await fetch(`https://localhost:7056/products/${id}`, {
        method: "GET"
    });

    return response;
}

export async function editProduct(productModel) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch(`https://localhost:7056/products`, {
            method: "PUT",
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

export async function getProductsByCategories() {
    const response = await fetch(`https://localhost:7056/products/by-category-count`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByProductId(id) {
    const response = await fetch(`https://localhost:7056/images/${id}`, {
        method: "GET"
    });

    return await response.json();
}

export async function getFormFile(base64Image, imageData, fileName) {
    const response = await fetch(`https://localhost:7056/images`, {
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