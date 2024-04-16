export async function getFormData(request) {
    const data = await request.formData();
    const userData = Object.fromEntries(data.entries());
    return userData;
}

export function buildQuery(page, categories, price) {
    let query = `?page=${page}`;
    if (categories && categories != "") {
        query += `&categories=${categories}`;
    }
    if (price && price != "") {
        query += `&price=${price}`;
    }

    return query;
}

export function getFilters() {
    const page = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");

    return { page, categories, price };
}

export function cleanFilters() {
    sessionStorage.setItem("categories", "");
    sessionStorage.setItem("price", "");
    sessionStorage.setItem("page", 1);
}