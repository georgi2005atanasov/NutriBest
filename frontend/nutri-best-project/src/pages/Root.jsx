import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../utils/util";
import { useEffect } from "react";

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
    </>
}

export function loader() {
    const token = getAuthToken();
    return token;
}