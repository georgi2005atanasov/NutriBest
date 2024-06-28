import { useEffect } from "react";
import { cleanFilters } from "../../utils/utils";
import { useActionData, useSubmit } from "react-router-dom";

export default function Logout() {
    const message = useActionData();
    const submit = useSubmit();

    localStorage.removeItem("authToken");

    useEffect(() => {
        submit(message, {
            action: "/",
            method: "GET"
        }), []
    }, [submit, message]);

    return <></>;
}

export async function action({ request, params }) {
    localStorage.removeItem("expiration");
    localStorage.removeItem("duration")
    localStorage.removeItem("usersCount")

    sessionStorage.setItem("orders-page", 1);

    cleanFilters();

    let message = "message=You successfully logged out.&type=success";

    if (localStorage.getItem("successMessage")) {
        message = localStorage.getItem("successMessage");
        localStorage.removeItem("successMessage");
    }

    return message;
}