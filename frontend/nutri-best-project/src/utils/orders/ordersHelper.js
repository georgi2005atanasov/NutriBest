export function getOrdersFilters() {
    const ordersPage = Number(sessionStorage.getItem("orders-page"));
    const search = sessionStorage.getItem("search");
    const filters = sessionStorage.getItem("orders-filters");
    const startDate = sessionStorage.getItem("startDateOrders");
    const endDate = sessionStorage.getItem("endDateOrders");

    return {
        ordersPage,
        search,
        filters,
        startDate,
        endDate
    }
}