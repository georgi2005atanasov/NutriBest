export function getNewsletterFilters() {
    const page = Number(sessionStorage.getItem("users-page"));
    const search = sessionStorage.getItem("search");
    const groupType = sessionStorage.getItem("newsletter-group-type");

    return {
        page,
        search,
        groupType
    };
}