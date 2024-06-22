import { PRODUCTS_VIEWS } from "../../pages/Root";

export function getPrice(price, discountPercentage) {
    return price * ((100 - discountPercentage) / 100);
}

export function getProductsFilters() {
    const currentPage = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");
    const alpha = sessionStorage.getItem("alpha");
    const productsView = sessionStorage.getItem("productsView") || PRODUCTS_VIEWS.all;
    const search = sessionStorage.getItem("search") || "";
    const priceRange = sessionStorage.getItem("priceRange") || "";
    const brand = sessionStorage.getItem("brand") || "";
    const quantities = sessionStorage.getItem("quantities") || "";
    const flavours = sessionStorage.getItem("flavours") || "";

    return {
        currentPage,
        categories,
        price,
        alpha,
        productsView,
        search,
        priceRange,
        brand,
        quantities,
        flavours
    }
}