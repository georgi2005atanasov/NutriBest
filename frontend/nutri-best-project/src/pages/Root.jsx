import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";
import Footer from "../components/UI/Footer";
import CategoryContextProvider from "../store/CategoryContext";
import Loader from "../components/UI/Loader";


export default function RootLayout() {
    const TOKEN_DURATION = localStorage.getItem("duration");
    const token = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();

    const isLoading = navigation.state == "loading";

    useEffect(() => {
        if (!sessionStorage.getItem("price")) {
            sessionStorage.setItem("price", "");
        }
        if (!sessionStorage.getItem("alpha")) {
            sessionStorage.setItem("alpha", "");
        }
        if (!sessionStorage.getItem("categories")) {
            sessionStorage.setItem("categories", "");
        }
        if (!sessionStorage.getItem("page")) {
            sessionStorage.setItem("page", 1);
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