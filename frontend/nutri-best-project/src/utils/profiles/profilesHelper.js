export function getProfileFilters() {
    const usersPage = Number(sessionStorage.getItem("users-page")); // get from session storage
    const search = sessionStorage.getItem("search");
    const groupType = sessionStorage.getItem("users-group-type");
    
    return {
        usersPage,
        search,
        groupType
    };
}