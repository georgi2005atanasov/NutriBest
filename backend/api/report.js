import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function getTopSellingProducts() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/TopSellingProducts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function getTopSellingBrands() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/TopSellingBrands`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function getTopSellingFlavours() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/TopSellingFlavours`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function getTopSellingCategories() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/TopSellingCategories`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}