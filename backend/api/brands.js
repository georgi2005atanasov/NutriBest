import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allBrands() {
    const response = await fetch(`${HOST}/Brands`, {
        method: "GET"
    });

    return await response.json();
}

export async function getImageByBrandName(brand) {
    const response = await fetch(`${HOST}/Images/Brand/${brand}`, {
        method: "GET"
    });

    return await response.json();
}

export async function addBrand(brandData) {
    const token = getAuthToken();

    const response = await fetch(`${HOST}/Brands`, {
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

    const response = await fetch(`${HOST}/Brands/${brand}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

