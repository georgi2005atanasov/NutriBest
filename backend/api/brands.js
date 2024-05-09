import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allBrands() {
    const response = await fetch(`https://localhost:7056/brands`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByBrandName(brand) {
    const response = await fetch(`https://localhost:7056/images/brand/${brand}`, {
        method: "GET"
    });

    return await response.json();
}

export async function addBrand(brandData) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/brands`, {
        method: "POST",
        body: brandData,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function deleteBrandByName(brand) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/brands/${brand}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

