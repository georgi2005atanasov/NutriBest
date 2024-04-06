import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";
import FooterPage from "./Footer";

const NORMAL_TOKEN_DURATION = 1 * 60 * 60 * 1000;
// const NORMAL_TOKEN_DURATION = 1 * 60 * 60 * 1000;

export default function RootLayout() {
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
        }, NORMAL_TOKEN_DURATION);
    }, [token, submit]);


    return <>
        <MainNavigation />
        <Outlet />
        <FooterPage />
    </>
}

export function loader() {
    const token = getAuthToken();
    return token;
}