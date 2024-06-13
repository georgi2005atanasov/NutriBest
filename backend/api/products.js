import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { buildQuery } from "../../frontend/nutri-best-project/src/utils/utils";

export async function addProduct(productModel) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {
        const response = await fetch("https://localhost:7056/Products", {
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

export async function allProducts(page, categories = "", price = "", alpha = "", productsView = "", search = "", priceRange = [], brand = "", quantities = "", flavours = "") {
    const query = buildQuery(page, categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours);
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Products${query}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function getProductById(id) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Products/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response;
}

export async function getProductDetailsByIdAndName(id, name) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Products/Details/${id}/${name}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function setProductDetailsById(id, data) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Products/Details/${id}`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function editProduct(productModel, id) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch(`https://localhost:7056/Products/${id}`, {
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

export async function partialEditProduct(id, productModel) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch(`https://localhost:7056/Products/${id}`, {
            method: "PATCH",
            body: productModel,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    }
    else {
        throw Error("Token expired!")
    }
}

export async function deleteProduct(productId) {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {
        const response = await fetch(`https://localhost:7056/Products/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function getProductsByCategories() {
    const response = await fetch(`https://localhost:7056/Products/ByCategoryCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByQuantity() {
    const response = await fetch(`https://localhost:7056/Products/ByQuantityCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByBrand() {
    const response = await fetch(`https://localhost:7056/Products/ByBrandCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByFlavour() {
    const response = await fetch(`https://localhost:7056/Products/ByFlavourCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByProductId(id) {
    const response = await fetch(`https://localhost:7056/Images/${id}`, {
        method: "GET"
    });

    return await response.json();
}

export async function getIdentifiers() {
    const response = await fetch(`https://localhost:7056/Products/Identifiers`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductSpecs(id, name) {
    const response = await fetch(`https://localhost:7056/Products/Specs/${id}/${name}`, {
        method: "GET"
    });

    return response;
}

export async function getRelated(categories, productId) {
    const response = await fetch(`https://localhost:7056/Products/Related`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categories,
            productId
        })
    });

    return response;
}

export async function getCurrentProductPrice(productId, flavour, grams) {
    try {
        const response = await fetch(`https://localhost:7056/Products/CurrentPrice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId,
                flavour,
                package: grams
            })
        });

        return await response.json();
    } catch (error) {
        return NaN;
    }
}