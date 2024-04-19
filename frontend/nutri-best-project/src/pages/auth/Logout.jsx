import { redirect } from "react-router-dom";
import { cleanFilters } from "../../utils/utils";

export function action() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("duration")

    cleanFilters();

    return redirect("/");
}