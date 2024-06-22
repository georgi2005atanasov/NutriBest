import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { buildQuery } from "../../frontend/nutri-best-project/src/utils/utils";
import { HOST } from "../utils/util";

export async function addProduct(productModel) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    if (token != "EXPIRED" && token != 0) {
        const response = await fetch(`${HOST}/Products`, {
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

    const response = await fetch(`${HOST}/Products${query}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function getProductById(id) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return null;
    }

    const response = await fetch(`${HOST}/Products/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response;
}

export async function getProductDetailsByIdAndName(id, name) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Products/Details/${id}/${name}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await response.json();
}

export async function setProductDetailsById(id, data) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Products/Details/${id}`, {
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

        const response = await fetch(`${HOST}/Products/${id}`, {
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

        const response = await fetch(`${HOST}/Products/${id}`, {
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
        const response = await fetch(`${HOST}/Products/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    }
}

export async function getProductsByCategories() {
    const response = await fetch(`${HOST}/Products/ByCategoryCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByQuantity() {
    const response = await fetch(`${HOST}/Products/ByQuantityCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByBrand() {
    const response = await fetch(`${HOST}/Products/ByBrandCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductsByFlavour() {
    const response = await fetch(`${HOST}/Products/ByFlavourCount`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByProductId(id) {
    const response = await fetch(`${HOST}/Images/${id}`, {
        method: "GET"
    });

    return await response.json();
}

export async function getIdentifiers() {
    const response = await fetch(`${HOST}/Products/Identifiers`, {
        method: "GET"
    });

    return await response.json();
}

export async function getProductSpecs(id, name) {
    const response = await fetch(`${HOST}/Products/Specs/${id}/${name}`, {
        method: "GET"
    });

    return response;
}

export async function getRelated(categories, productId) {
    const response = await fetch(`${HOST}/Products/Related`, {
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
        const response = await fetch(`${HOST}/Products/CurrentPriceWithQuantity`, {
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