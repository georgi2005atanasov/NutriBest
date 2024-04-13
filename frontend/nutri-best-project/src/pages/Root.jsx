import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";
import Footer from "./Footer";


export default function RootLayout() {
    const TOKEN_DURATION = localStorage.getItem("duration");
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, { action: "/logout", method: "post" });
        }

        setTimeout(() => {
            submit(null, { action: "/logout", method: "post" });
        }, TOKEN_DURATION);
    }, [token, submit, TOKEN_DURATION]);


    return <>
        <MainNavigation />
        <Outlet context={token} />
        <Footer />
    </>
}

export function loader() {
    const token = getAuthToken();
    return token;
}