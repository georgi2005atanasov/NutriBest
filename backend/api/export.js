import { HOST } from "../utils/util";
import { buildQuery } from "../../frontend/nutri-best-project/src/utils/utils";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";

export async function exportBrands() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Brands/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportProducts(hasFilters, categories = "", price = "", alpha = "", search = "", priceRange = [], brand = "", quantities = "", flavours = "") {
    const query = buildQuery(null, categories, price, alpha, null, search, priceRange, brand, quantities, flavours);
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }

    const response = await fetch(`${HOST}/Products/CSV${hasFilters ? query : ""}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportCategories() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Categories/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportFlavours() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Flavours/CSV`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportNewsletter(hasFilters, search, groupType) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }

    let endpoint = `${HOST}/Newsletter/CSV?`;

    if (hasFilters) {
        endpoint += `search=${search}&groupType=${groupType}`;
    }

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportOrders(hasFilters, search, filters, startDate, endDate) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    let query = `?search=${search}&filters=${filters}&startDate=${startDate ? startDate : ""}&endDate=${endDate ? endDate : ""}`;

    if (!isAdmin && !isEmployee) {
        return;
    }

    const response = await fetch(`${HOST}/Orders/CSV${hasFilters ? query : ""}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportOrdersSummary() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }

    const response = await fetch(`${HOST}/Orders/CSV/Summary`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportPackages() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Packages/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportProfiles(hasFilters, search, groupType) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }

    let endpoint = `${HOST}/Profiles/CSV?`;

    if (hasFilters) {
        endpoint += `search=${search}&groupType=${groupType}`;
    }

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}


export async function exportPromoCodes() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/PromoCodes/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportPromotions() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/Promotions/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportPerformanceInfo(hasFilters, startDate, endDate) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    let query = `?startDate=${startDate ? startDate : ""}&endDate=${endDate ? endDate : 0}`;

    if (!isAdmin && !isEmployee) {
        return;
    }

    const response = await fetch(`${HOST}/Reports/CSV/PerformanceInfo${hasFilters ? query : ""}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportDemographicsInfo(hasFilters, startDate, endDate) {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    let query = `?startDate=${startDate ? startDate : ""}&endDate=${endDate ? endDate : 0}`;

    if (!isAdmin && !isEmployee) {
        return;
    }

    const response = await fetch(`${HOST}/Reports/CSV/DemographicsInfo${hasFilters ? query : ""}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}

export async function exportShippingDiscounts() {
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return;
    }
    
    let endpoint = `${HOST}/ShippingDiscounts/CSV?`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response;
}