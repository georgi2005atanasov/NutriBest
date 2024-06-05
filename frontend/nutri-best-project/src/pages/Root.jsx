import MainNavigation from "../components/Navigation/MainNavigation";
import Footer from "../components/UI/Shared/Footer";
import Loader from "../components/UI/Shared/Loader";
import CategoryBrandContextProvider from "../store/CategoryBrandContext";
import ProductSpecsContextProvider from "../store/ProductSpecsContext";
import { getAuthToken } from "../utils/auth";
import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import CartContextProvider from "../store/CartContext";
import useAuth from "../hooks/useAuth";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PRICE = "";
export const DEFAULT_CATEGORY = "";
export const DEFAULT_BRAND = "";
export const DEFAULT_ALPHA = "";
export const DEFAULT_QUANTITY = "";
export const DEFAULT_FLAVOURS = "";
export const PRODUCTS_VIEWS = { all: "all", table: "table" };

export default function RootLayout() {
    const TOKEN_DURATION = localStorage.getItem("duration");
    const token = useLoaderData();
    const { isAdmin, isEmployee } = useAuth(token);
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
        if (!sessionStorage.getItem("brand")) {
            sessionStorage.setItem("brand", DEFAULT_BRAND);
        }
        if (!sessionStorage.getItem("page")) {
            sessionStorage.setItem("page", DEFAULT_PAGE);
        }
        if (!sessionStorage.getItem("quantities")) {
            sessionStorage.setItem("quantities", DEFAULT_QUANTITY);
        }
        if (!sessionStorage.getItem("flavours")) {
            sessionStorage.setItem("flavours", DEFAULT_FLAVOURS);
        }
        if (isAdmin || isEmployee) {
            if (!sessionStorage.getItem("orders-page")) {
                sessionStorage.setItem("orders-page", DEFAULT_PAGE);
            }
            if (!sessionStorage.getItem("users-page")) {
                sessionStorage.setItem("users-page", DEFAULT_PAGE);
            }
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
        <CategoryBrandContextProvider>
            <ProductSpecsContextProvider>
                <CartContextProvider>
                    <MainNavigation />
                    <Outlet context={token} />
                </CartContextProvider>
            </ProductSpecsContextProvider>
        </CategoryBrandContextProvider>
        <Footer />
    </>
}

export function loader() {
    const token = getAuthToken();

    return token;
}