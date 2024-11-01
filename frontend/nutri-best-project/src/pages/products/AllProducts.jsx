import styles from "./css/AllProducts.module.css";
import ProductsPagination from "../../components/UI/Pagination/ProductsPagination";
import DownloadCsvOptionsButton from "../../components/UI/Buttons/Download/DownloadCsvOptionsButton";
import Message from "../../components/UI/Shared/Message";
import ChangeLayoutButton from "../../components/UI/Buttons/Utility/ChangeLayoutButton";
import FilterSidebar from "../../components/UI/Sidebar/Filters/FilterSidebar";
import Loader from "../../components/UI/Shared/Loader";
import ProductsList from "./ProductsList";
import Table from "./Table";
import { PRODUCTS_VIEWS } from "../Root";
import { getProductsFilters } from "../../utils/products/productsHelper.js";
import useAuth from "../../hooks/useAuth";
import { allPromotions, exportProducts, allProducts, getImageByProductId } from "../../../../../backend/api/api";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData, redirect, defer, Await, useSearchParams, useRouteLoaderData, useSubmit } from "react-router-dom";
import { Suspense, useState, useEffect, useCallback, useContext } from "react";

export default function AllProducts() {
    const { setProductSpecs } = useContext(ProductSpecsContext);
    const [productsView, setProductsView] = useState(PRODUCTS_VIEWS.all);
    const token = useRouteLoaderData("rootLoader");
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

    let [searchParams, setSearchParams] = useSearchParams();

    let { message, messageType } = getMessage(searchParams);

    const { productsRows, page } = useLoaderData();

    useEffect(() => {
        sessionStorage.setItem("search", ""); // cleans previous searches
    }, []); // idk if this is correct, it is new, i put it in orders and users tables

    useEffect(() => {
        setProductSpecs([]);
    }, [setProductSpecs]); // resetting this because it sets where it
    // must not

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

    const toTableView = useCallback(function toTableView() {
        sessionStorage.setItem("productsView", PRODUCTS_VIEWS.table);
        setProductsView(PRODUCTS_VIEWS.table)
    }, []);

    const toUserView = useCallback(function toUserView() {
        sessionStorage.setItem("productsView", PRODUCTS_VIEWS.all);
        setProductsView(PRODUCTS_VIEWS.all)
    }, []);

    const handleExport = useCallback(async function handleExport(withFilters) {
        const { categories,
            price,
            alpha,
            search,
            priceRange,
            brand,
            quantities,
            flavours
        } = getProductsFilters();

        return await exportProducts(withFilters,
            withFilters && categories,
            withFilters && price,
            withFilters && alpha,
            withFilters && search,
            withFilters && priceRange,
            withFilters && brand,
            withFilters && quantities,
            withFilters && flavours)
    }, []);

    return <>
        <AnimatePresence>
            <motion.div
                className="all-products d-flex justify-content-md-end justify-content-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
            >
                <div className="container-fluid mx-lg-4 mx-2">
                    <div className="row d-flex flex-md-column justify-content-center">
                        <div className="p-0 row d-flex justify-content-xl-between justify-content-center align-items-start">
                            <div className="container">
                                <div className="row">
                                    <div className="d-flex offset-md-3 offset-lg-2 offset-xl-3 text-center">
                                        <h3>Products</h3>
                                    </div>
                                    <div className="d-flex offset-md-3 offset-lg-2 offset-xl-3 text-center">
                                        <p className="mb-2">{sessionStorage.getItem("productsCount")} products found</p>
                                    </div>

                                    {message && <Message message={message} messageType={messageType} />}

                                    {(isAdmin || isEmployee) && productsView === "all" &&
                                        <div className="mb-3 d-flex justify-content-end">
                                            <ChangeLayoutButton
                                                text={"View as Table"}
                                                onClick={toTableView} />
                                            <div className="mx-1"></div>
                                            <div className="d-flex justify-content-end mt">
                                                <DownloadCsvOptionsButton
                                                    fileName="products"
                                                    exportFunction={handleExport} />
                                            </div>
                                        </div>}

                                    {(isAdmin || isEmployee) && productsView === "table" &&
                                        <div className="mb-3 d-flex justify-content-end">
                                            <ChangeLayoutButton
                                                text="View as User"
                                                onClick={toUserView} />
                                            <div className="mx-1"></div>
                                            <div className="d-flex justify-content-end mt">
                                                <DownloadCsvOptionsButton
                                                    fileName="products"
                                                    exportFunction={handleExport} />
                                            </div>
                                        </div>}
                                </div>
                            </div>

                            <FilterSidebar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />

                            <div className="col-md-9">
                                <Suspense fallback={
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Loader />
                                        <div className={styles["big-margin"]}></div>
                                    </div>}>
                                    <Await resolve={productsRows}>
                                        {resolvedRows => productsView == PRODUCTS_VIEWS.table ?
                                            <Table productsRows={resolvedRows} /> :
                                            <ProductsList productsRows={resolvedRows} />}
                                    </Await>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-6 col-md-9">
                            <ProductsPagination productsView={productsView} page={page} productsCount={sessionStorage.getItem("productsCount")} />
                        </div>
                    </div>
                </div>
            </motion.div >
        </AnimatePresence>
    </>;
}

async function loadProductsData(page, categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours) {
    async function storeImages(productsRows) {
        const products = productsRows.flat();

        const imagePromises = products.map(async (p) => {
            await getImageByProductId(p.productId);
        });

        await Promise.all(imagePromises);
    }

    try {
        if (categories || price || alpha || brand || priceRange || quantities || flavours) {
            sessionStorage.setItem("page", 1);
        }

        let products = await allProducts(Number(page), categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours);

        if (!products.ok) {
            sessionStorage.setItem("productsCount", 0);
            return redirect("/?message=Invalid Page!&type=danger");
        }

        const { productsRows, count, maxPrice } = await products.json();

        sessionStorage.setItem("productsCount", count);
        sessionStorage.setItem("productsView", productsView);
        sessionStorage.setItem("maxPrice", maxPrice);

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
    const { currentPage,
        categories,
        price,
        alpha,
        productsView,
        search,
        priceRange,
        brand,
        quantities,
        flavours
    } = getProductsFilters();

    if (!currentPage || isNaN(currentPage)) {
        return redirect("/?message=Invalid page number provided.&type=danger");
    }

    const page = Number(currentPage);

    return defer({
        productsRows: loadProductsData(
            page, categories, price, alpha, productsView, search, priceRange, brand, quantities, flavours),
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