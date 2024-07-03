import { useEffect } from "react";
import { cleanFilters } from "../../utils/utils";
import { redirect, useActionData, useSubmit } from "react-router-dom";

// export default function Logout() {
//     const message = useActionData();
//     const submit = useSubmit();

//     useEffect(() => {
//         localStorage.removeItem("authToken");
//         return submit(message, {
//             action: "/",
//             method: "GET"
//         })
//     }, [submit, message]);

//     return <></>;
// }

export async function action({ request, params }) {
    localStorage.removeItem("expiration");
    localStorage.removeItem("duration")
    localStorage.removeItem("usersCount")

    sessionStorage.setItem("orders-page", 1);

    cleanFilters();

    localStorage.removeItem("authToken");

    return redirect("/");
}