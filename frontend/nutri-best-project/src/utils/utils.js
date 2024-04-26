import { PRODUCTS_VIEWS } from "../pages/Root";

export async function getFormData(request) {
    const data = await request.formData();
    const userData = Object.fromEntries(data.entries());
    return userData;
}

export function buildQuery(page, categories, price, alpha, productsView, search, priceRange) {
    let query = `?page=${page}`;
    if (categories && categories != "") {
        query += `&categories=${categories.split("+").join("+and+")}`;
    }
    if (price && price != "") {
        query += `&price=${price}`;
    }
    if (alpha && alpha != "") {
        query += `&alpha=${alpha}`;
    }
    if (productsView && productsView != "") {
        query += `&productsView=${productsView}`;
    }
    if (search && search != "") {
        query += `&search=${search}`;
    }
    if (priceRange && priceRange.length && priceRange.length != 0) {
        query += `&priceRange=${priceRange}`;
    }

    return query;
}

export function getFilters() {
    const page = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");
    const alpha = sessionStorage.getItem("alpha");

    return { page, categories, price, alpha };
}

export function cleanFilters() {
    sessionStorage.setItem("categories", "");
    sessionStorage.setItem("price", "");
    sessionStorage.setItem("page", 1);
    
    sessionStorage.setItem("productsView", PRODUCTS_VIEWS.all);
    sessionStorage.setItem("search", "");
    sessionStorage.setItem("priceRange", "");
    sessionStorage.setItem("alpha", "");
}