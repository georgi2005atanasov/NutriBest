import { PRODUCTS_VIEWS } from "../pages/Root";

export async function getFormData(request) {
    const data = await request.formData();
    const dataToReturn = Object.fromEntries(data.entries());
    return dataToReturn;
}

export function buildQuery(page, categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours) {
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
    if (brand && brand != "") {
        query += `&brand=${brand}`;
    }
    if (quantities && quantities != "") {
        query += `&quantities=${quantities}`
    }
    if (flavours && flavours != "") {
        query += `&flavours=${flavours}`
    }
    
    return query;
}

export function getFilters() {
    const page = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");
    const alpha = sessionStorage.getItem("alpha");
    const brand = sessionStorage.getItem("brand");
    const quantities = sessionStorage.getItem("quantities");
    const flavours = sessionStorage.getItem("flavours");

    return { page, categories, price, alpha, brand, quantities, flavours };
}

export function cleanFilters() {
    try {
        sessionStorage.setItem("categories", "");
        sessionStorage.setItem("price", "");
        sessionStorage.setItem("page", 1);
        
        sessionStorage.setItem("productsView", PRODUCTS_VIEWS.all);
        sessionStorage.setItem("priceRange", "");
        sessionStorage.setItem("alpha", "");
        sessionStorage.setItem("brand", "");
        sessionStorage.setItem("quantities", "");
        sessionStorage.setItem("flavours", "");
        sessionStorage.setItem("search", "");
    } catch (error) {
        return;
    }
}

export function getDate(dateString) {
    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}/${formattedMonth}/${formattedDay}`;
}