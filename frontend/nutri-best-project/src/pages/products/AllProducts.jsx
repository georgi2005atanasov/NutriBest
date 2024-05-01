import styles from "./css/AllProducts.module.css";
import { Suspense, useState, useEffect, useCallback } from "react";
import { allProducts, getImageByProductId } from "../../../../../backend/api/api";
import { useLoaderData, redirect, defer, Await, useSearchParams, useRouteLoaderData, useSubmit } from "react-router-dom";
import Pagination from "../../components/UI/Pagination/Pagination";
import ProductsList from "./ProductsList";
import Message from "../../components/UI/Shared/Message";
import useAuth from "../../hooks/useAuth";
import { PRODUCTS_VIEWS } from "../Root";
import Table from "./Table";
import ChangeLayoutButton from "../../components/UI/Buttons/ChangeLayoutButton";
import FilterSidebar from "../../components/UI/Sidebar/FilterSidebar";
import { allPromotions } from "../../../../../backend/api/api";

export default function AllProducts() {
    const [productsView, setProductsView] = useState(PRODUCTS_VIEWS.all);
    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);
    const submit = useSubmit();

    let [searchParams, setSearchParams] = useSearchParams();

    let { message, messageType } = getMessage(searchParams);

    const { productsRows, page, promotions } = useLoaderData();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                localStorage.removeItem("editMessage");
                localStorage.removeItem("addMessage");

                if (productsRows && productsRows.length == 0) {
                    sessionStorage.setItem("page", 1);
                }

                setSearchParams({});
            }, 2500);


            return () => clearTimeout(timer);
        }
    }, [message, setSearchParams]);

    useEffect(() => {
        return submit(null, { action: "", method: "get" });
    }, [productsView]);

    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = useCallback(() => setSidebarVisible(!isSidebarVisible), [isSidebarVisible]);

    function toTableView() {
        sessionStorage.setItem("productsView", PRODUCTS_VIEWS.table);
        setProductsView(PRODUCTS_VIEWS.table)
    }

    function toUserView() {
        sessionStorage.setItem("productsView", PRODUCTS_VIEWS.all);
        setProductsView(PRODUCTS_VIEWS.all)
    }

    return <>
        <div className="all-products d-flex justify-content-end">
            <div className="container-fluid mx-lg-4 mx-2">
                <div className="row d-flex flex-md-column justify-content-center">
                    <div className="p-0 row d-flex justify-content-xl-between justify-content-center align-items-start">
                        <div className="container">
                            <div className="row">
                                <div className="d-flex offset-md-3 text-center">
                                    <h3>Products</h3>
                                </div>
                                <div className="d-flex offset-md-3 text-center">
                                    <p className="mb-2">{sessionStorage.getItem("productsCount")} products found</p>
                                </div>

                                {message && <Message message={message} messageType={messageType} />}

                                {isAdmin && productsView === "all" &&
                                    <div className="mb-3 d-flex justify-content-end">
                                        <ChangeLayoutButton
                                            text={"View as Table"}
                                            onClick={toTableView} />
                                        <div className="mx-1"></div>
                                    </div>}

                                {isAdmin && productsView === "table" &&
                                    <div className="mb-3 d-flex justify-content-end">
                                        <ChangeLayoutButton
                                            text={"View as User"}
                                            onClick={toUserView} />
                                        <div className="mx-1"></div>
                                    </div>}
                            </div>
                        </div>

                        <FilterSidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />

                        <div className="col-md-9">
                            <Suspense fallback={
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className={styles["big-margin"]}></div>
                                </div>}>
                                <Await resolve={productsRows}>
                                    {productsRows => productsView == PRODUCTS_VIEWS.table ?
                                        <Table productsRows={productsRows} /> :
                                        <ProductsList productsRows={productsRows} />}
                                </Await>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 col-md-9">
                        <Pagination productsView={productsView} page={page} productsCount={sessionStorage.getItem("productsCount")} />
                    </div>
                </div>
            </div>
        </div >
    </>;
}

async function loadProductsData(page, categories, price, alpha, productsView, search, priceRange) {
    async function storeImages(productsRows) {
        const products = productsRows.flat();

        const imagePromises = products.map(async (p) => {
            await getImageByProductId(p.productId);
        });

        await Promise.all(imagePromises);
    }

    try {
        if (categories || price || alpha) {
            sessionStorage.setItem("page", 1);
        }

        let products = await allProducts(Number(page), categories, price, alpha, productsView, search, priceRange);

        if (!products.ok) {
            sessionStorage.setItem("productsCount", 0);
            return redirect("/?message=Invalid Page!&type=danger");
        }

        const { productsRows, count, maxPrice } = await products.json();

        sessionStorage.setItem("productsCount", count);
        sessionStorage.setItem("productsView", productsView);
        sessionStorage.setItem("maxPrice", maxPrice);
        // sessionStorage.setItem("priceRange", `${0} ${maxPrice}`);

        await storeImages(productsRows);

        return productsRows;
    } catch (error) {
        return redirect("/?message=Internal Server Error!&type=danger");
    }
}

async function getPromotions() {
    const result = await allPromotions();
    return result;
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const currentPage = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");
    const alpha = sessionStorage.getItem("alpha");
    const productsView = sessionStorage.getItem("productsView") || PRODUCTS_VIEWS.all;
    const search = sessionStorage.getItem("search") || "";
    const priceRange = sessionStorage.getItem("priceRange") || "";

    if (!currentPage || isNaN(currentPage)) {
        return redirect("/?message=Invalid page number provided.&type=danger");
    }

    const page = Number(currentPage);

    return defer({
        productsRows: await loadProductsData(
            page, categories, price, alpha, productsView, search, priceRange),
        promotions: await getPromotions(),
        page,
        productsView,
    });
}

function getMessage(searchParams) {
    let message = searchParams.get('message');
    let messageType = searchParams.get('type');

    if (!message && localStorage.getItem("editMessage")) {
        const [editMessage, type] = localStorage.getItem("editMessage").split("&");
        message = editMessage;
        messageType = type;
    }

    if (!message && localStorage.getItem("addMessage")) {
        const [editMessage, type] = localStorage.getItem("addMessage").split("&");
        message = editMessage;
        messageType = type;
    }

    return {
        message,
        messageType
    };
}