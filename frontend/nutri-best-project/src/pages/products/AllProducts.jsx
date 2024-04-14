import { Suspense, useEffect, useState } from "react";
import { allProducts } from "../../../../../backend/api/api";
import { useLoaderData, redirect, defer, Await, json } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
import SideBar from "../../components/UI/SideBar";
import SideBarToggler from "../../components/UI/SideBarToggler";
import styles from "../css/AllProducts.module.css";
import Loader from "../../components/UI/Loader";
import ProductsList from "./ProductsList";

export default function AllProducts() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const { page, productsRows } = useLoaderData();

    return <div className="all-products d-flex justify-content-end">
        <div className="container-fluid mx-lg-4 mx-2">
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
                <Pagination page={page} />
            </div>
        </div>
    </div >;
}

async function loadProductsData(page, categories, price) {
    try {
        let products = await allProducts(Number(page) - 1, categories, price);

        if (!products.ok) {
            return redirect("/?message=Invalid Page!&type=danger");
        }

        let productsRows = await products.json();

        return productsRows;
    } catch (error) {
        return redirect("/?message=Internal Server Error!&type=danger");
    }
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const currentPage = localStorage.getItem("page");
    const categories = localStorage.getItem("categories");
    const price = localStorage.getItem("price");

    //make good error handle
    if (!currentPage || isNaN(currentPage)) {
        throw json("Invalid page");
    }

    const page = Number(currentPage);

    return defer({
        productsRows: loadProductsData(page, categories, price),
        page
    });
}
