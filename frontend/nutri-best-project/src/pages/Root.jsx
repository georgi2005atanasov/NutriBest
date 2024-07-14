import MainNavigation from "../components/Navigation/MainNavigation";
import Footer from "../components/UI/Shared/Footer";
import Notification from "../components/Notifications/Notification";
import LowStockNotification from "../components/Notifications/LowStockNotification";
import CategoryBrandContextProvider from "../store/CategoryBrandContext";
import { getAuthToken } from "../utils/auth";
import useAuth from "../hooks/useAuth";
import ProductSpecsContextProvider from "../store/ProductSpecsContext";
import CartContextProvider from "../store/CartContext";
import { connection } from "../../../../backend/services/signalRService";
import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export const DEFAULT_PAGE = 1;
export const DEFAULT_NEWSLETTER_GROUP_TYPE = "all";
export const DEFAULT_PRICE = "";
export const DEFAULT_CATEGORY = "";
export const DEFAULT_BRAND = "";
export const DEFAULT_ALPHA = "";
export const DEFAULT_QUANTITY = "";
export const DEFAULT_FLAVOURS = "";
export const PRODUCTS_VIEWS = { all: "all", table: "table" };

export default function RootLayout() {
    const token = useLoaderData();
    const { isAdmin, isEmployee, isUser } = useAuth(token);

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
        if (isAdmin || isUser || isEmployee) {
            if (!sessionStorage.getItem("orders-page")) {
                sessionStorage.setItem("orders-page", DEFAULT_PAGE);
            }
        }
        if (isAdmin || isEmployee) {
            if (!sessionStorage.getItem("users-page")) {
                sessionStorage.setItem("users-page", DEFAULT_PAGE);
            }

            if (!sessionStorage.getItem("newsletter-group-type")) {
                sessionStorage.setItem("newsletter-group-type", DEFAULT_NEWSLETTER_GROUP_TYPE);
            }

            if (!sessionStorage.getItem("notifications-page")) {
                sessionStorage.setItem("notifications-page", DEFAULT_PAGE);
            }
        }
    }, [isAdmin, isEmployee, isUser]);

    useEffect(() => {
        async function updateRoutes() {
            await connection.invoke('JoinPage', window.location.pathname);
        }

        updateRoutes()
        sessionStorage.removeItem("startDateOrders");
        sessionStorage.removeItem("endDateOrders");
        sessionStorage.removeItem("startDatePerformance");
        sessionStorage.removeItem("endDatePerformance");
        sessionStorage.removeItem("startDateDemographics");
        sessionStorage.removeItem("endDateDemographics");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);

    return <>
        <CategoryBrandContextProvider>
            <ProductSpecsContextProvider>
                <CartContextProvider>
                    <MainNavigation />
                    {isAdmin && <>
                        <Notification />
                        <LowStockNotification />
                    </>}
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