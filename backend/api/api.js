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

        return response;
    }
    else {
        throw Error("Token expired!")
    }
}

export async function allProducts() {
    const token = getAuthToken();

    if (token != "EXPIRED" && token != 0) {

        const response = await fetch("https://localhost:7056/products", {
            method: "GET"
        });

        return response;
    }
    else {
        throw Error("Token expired!")
    }
}