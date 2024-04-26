import { redirect } from "react-router-dom";
import { cleanFilters } from "../../utils/utils";

export function action({ request, params }) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("duration")

    cleanFilters();

    let message = "You successfully logged out.&type=success";

    if (localStorage.getItem("successMessage")) {
        message = localStorage.getItem("successMessage");
    }

    return redirect(`/?message=${message}`);
}