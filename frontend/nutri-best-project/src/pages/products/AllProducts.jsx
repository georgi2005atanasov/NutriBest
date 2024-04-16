import { Suspense, useState } from "react";
import { allProducts, getImageByProductId } from "../../../../../backend/api/api";
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

    const isFetching = navigation.state == "loading";

    const { productsRows, page } = useLoaderData();

    return <div className="all-products d-flex justify-content-end">
        <div className="container-fluid mx-lg-4 mx-2">
            <div className="row d-flex flex-md-column justify-content-center">
                <div className="p-0 row d-flex justify-content-between align-items-start">
                    <div className="container">
                        <div className="row">
                            <div className="offset-md-3">
                                <p>{sessionStorage.getItem("productsCount")} products available</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["filter"]} col-md-3 d-flex flex-column mb-3`}>
                        <SideBarToggler toggleSidebar={toggleSidebar} />
                        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                    </div>

                    <div className="col-md-9">
                        <div className="d-flex justify-content-center align-items-center">
                            {isFetching && <Loader />}
                        </div>
                        <Suspense fallback={
                            <div className="d-flex justify-content-center align-items-center">
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
    async function storeImages(productsRows) {
        const products = productsRows.flat();
        
        for (const p of products) {
            const image = await getImageByProductId(p.productId);
            const cachedImage = localStorage.getItem(`image-${p.productId}`);
            if (!cachedImage) {
                localStorage.setItem(`image-${p.productId}`, `data:${image.contentType};base64,${image.imageData}`);
            }
        }
    }

    try {
        let products = await allProducts(Number(page), categories, price);

        if (!products.ok) {
            sessionStorage.setItem("productsCount", 0);
            return redirect("/?message=Invalid Page!&type=danger");
        }

        const { productsRows, count } = await products.json();

        sessionStorage.setItem("productsCount", count);

        storeImages(productsRows);

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
        productsRows: await loadProductsData(page, categories, price),
        page
    });
}
