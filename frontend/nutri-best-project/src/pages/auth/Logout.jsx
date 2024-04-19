import { redirect } from "react-router-dom";
import { cleanCachedImages, cleanFilters } from "../../utils/utils";

export function action() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("duration")

    cleanFilters();
    cleanCachedImages();

    return redirect("/");
}