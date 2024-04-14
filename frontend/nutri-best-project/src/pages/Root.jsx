import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";
import Footer from "./Footer";
import CategoryContextProvider from "../store/CategoryContext";


export default function RootLayout() {
    const TOKEN_DURATION = localStorage.getItem("duration");
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!localStorage.getItem("price")) {
            localStorage.setItem("price", "");
        }
        if (!localStorage.getItem("categories")) {
            localStorage.setItem("categories", "");
        }
        if (!localStorage.getItem("page")) {
            localStorage.setItem("page", 1);
        }
    });

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
        <CategoryContextProvider>
            <MainNavigation />
            <Outlet context={token} />
            <Footer />
        </CategoryContextProvider>
    </>
}

export function loader() {
    const token = getAuthToken();

    return token;
}