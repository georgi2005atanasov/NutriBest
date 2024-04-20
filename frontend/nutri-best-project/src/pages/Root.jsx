import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";
import Footer from "../components/UI/Footer";
import CategoryContextProvider from "../store/CategoryContext";
import Loader from "../components/UI/Loader";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PRICE = "";
export const DEFAULT_CATEGORY = "";
export const DEFAULT_ALPHA = "";
export const PRODUCTS_VIEWS = { all: "all", table: "table" };

export default function RootLayout() {
    const TOKEN_DURATION = localStorage.getItem("duration");
    const token = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();

    const isLoading = navigation.state == "loading";

    useEffect(() => {
        if (!sessionStorage.getItem("price")) {
            sessionStorage.setItem("price", DEFAULT_PRICE);
        }
        if (!sessionStorage.getItem("alpha")) {
            sessionStorage.setItem("alpha", DEFAULT_ALPHA);
        }
        if (!sessionStorage.getItem("categories")) {
            sessionStorage.setItem("categories", DEFAULT_CATEGORY);
        }
        if (!sessionStorage.getItem("page")) {
            sessionStorage.setItem("page", DEFAULT_PAGE);
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
        {isLoading && <Loader />}
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