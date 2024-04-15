import { Suspense, useState } from "react";
import { allProducts } from "../../../../../backend/api/api";
import { useLoaderData, redirect, defer, Await, json, useNavigation } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
import SideBar from "../../components/UI/Sidebar/SideBar";
import SideBarToggler from "../../components/UI/Sidebar/SideBarToggler";
import styles from "../css/AllProducts.module.css";
import Loader from "../../components/UI/Loader";
import ProductsList from "./ProductsList";

export default function AllProducts() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
    const navigation = useNavigation();

    const isFetching = navigation.state == "submitting";

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
                        {isFetching && <Loader />}
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
        let products = await allProducts(Number(page), categories, price);

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
    const currentPage = sessionStorage.getItem("page");
    const categories = sessionStorage.getItem("categories");
    const price = sessionStorage.getItem("price");

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
