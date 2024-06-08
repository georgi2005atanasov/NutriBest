import { jwtDecode } from "jwt-decode"

export default function useAuth(token) {
    let isAdmin = false;
    let isAuthenticated = false;
    let isEmployee = false;
    let isUser = false;

    try {
        const tokenData = token ? jwtDecode(token) : null;

        if (tokenData) {
            if (Array.isArray(tokenData.role)) {
                isAdmin = tokenData && tokenData.role.includes("Administrator");
                isAuthenticated = !!token && token !== "EXPIRED" && token !== 0;
                isEmployee = tokenData && tokenData.role.includes("Employee");
                isUser = tokenData && tokenData.role.includes("User");
            } else {
                isAdmin = tokenData && tokenData.role === "Administrator";
                isAuthenticated = !!token && token !== "EXPIRED" && token !== 0;
                isEmployee = tokenData && tokenData.role == "Employee";
                isUser = tokenData && tokenData.role == "User";
            }
        }
    } catch (error) {
        console.error("Token decoding failed:", error);
    }

    return { isAuthenticated, isAdmin, isEmployee, isUser };
}