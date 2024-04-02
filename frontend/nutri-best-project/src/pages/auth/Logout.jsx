import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiration");
    return redirect("/");
}