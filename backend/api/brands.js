import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

export async function allBrands() {
    const response = await fetch(`https://localhost:7056/Brands`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByBrandName(brand) {
    const response = await fetch(`https://localhost:7056/Images/Brand/${brand}`, {
        method: "GET"
    });

    return await response.json();
}

export async function addBrand(brandData) {
    const token = getAuthToken();

    const response = await fetch(`https://localhost:7056/Brands`, {
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

    const response = await fetch(`https://localhost:7056/Brands/${brand}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

