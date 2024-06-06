import { jwtDecode } from "jwt-decode"

export default function useAuth(token) {
    let isAdmin = false;
    let isAuthenticated = false;
    let isEmployee = false;

    try {
        const tokenData = token ? jwtDecode(token) : null;
        isAdmin = tokenData && tokenData.role === "Administrator";
        isAuthenticated = !!token && token !== "EXPIRED" && token !== 0;
        isEmployee = tokenData && tokenData.role == "Employee";
    } catch (error) {
        console.error("Token decoding failed:", error);
    }

    return { isAuthenticated, isAdmin, isEmployee };
}