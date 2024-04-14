import { Suspense, useEffect, useState } from "react";
import { allProducts } from "../../../../../backend/api/api";
import { useLoaderData, redirect, defer, Await, json } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
import SideBar from "../../components/UI/SideBar";
import SideBarToggler from "../../components/UI/SideBarToggler";
import styles from "../css/AllProducts.module.css";
import Loader from "../../components/UI/Loader";
import ProductsList from "./ProductsList";

// const PRODUCTS_PER_PAGE = 6;
// const PRODUCTS_PER_ROW = 3;

export default function AllProducts() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const [currentPage, setPage] = useState(0);
    const { page, productsRows } = useLoaderData();

    useEffect(() => {
        if (!page) {
            return;
        }

        setPage(page);
    }, [page, productsRows]);

    return <div className="all-products d-flex justify-content-end">
        <div className="container-fluid mx-3">
            <div className="row d-flex flex-md-column justify-content-center">
                <div className="p-0 row d-flex justify-content-between align-items-start">
                    <div className={`${styles["filter"]} col-md-3 d-flex flex-column mb-3`}>
                        <SideBarToggler toggleSidebar={toggleSidebar} />
                        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                    </div>

                    <div className="col-md-9">
                        <Suspense fallback={
                            <div className="d-flex justify-content-center align-items-center">
                                <Loader />
                                <div className={styles["big-margin"]}></div>
                            </div>}>
                            <Await resolve={productsRows}>
                                {productsRows =>
                                    <ProductsList productsRows={productsRows} />}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </div>

            <div className="row">
                <Pagination page={currentPage} />
            </div>
        </div>
    </div >;
}

async function loadProductsData(page, categories) {
    try {
        let products = await allProducts(Number(page) - 1, categories);

        if (!products.ok) {
            return redirect("/?message=Invalid Page!&type=danger");
        }

        let productsRows = await products.json();

        return productsRows;
    } catch (error) {
        return json("Internal Server Error");
    }
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");
    const categories = url.searchParams.get("categories");

    if (isNaN(page)) {
        return null;
    }

    const parsedPage = Number(page);

    return defer({
        productsRows: loadProductsData(parsedPage, categories),
        parsedPage
    });
}
