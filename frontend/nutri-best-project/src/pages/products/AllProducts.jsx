import { Suspense, useState, useEffect } from "react";
import { allProducts, getImageByProductId } from "../../../../../backend/api/api";
import { useLoaderData, redirect, defer, Await, useSearchParams, useRouteLoaderData } from "react-router-dom";
import Pagination from "../../components/UI/Pagination";
import SideBar from "../../components/UI/Sidebar/SideBar";
import SideBarToggler from "../../components/UI/Sidebar/SideBarToggler";
import styles from "../css/AllProducts.module.css";
import ProductsList from "./ProductsList";
import Message from "../../components/UI/Message";
import NavigationLink from "../../components/Navigation/NavigationLink";
import useAuth from "../../hooks/useAuth";

export default function AllProducts() {
    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    let [searchParams, setSearchParams] = useSearchParams();
    const message = searchParams.get('message');
    const messageType = searchParams.get('type');
    const { productsRows, page } = useLoaderData();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setSearchParams({});
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [message, setSearchParams]);

    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return <>
        <div className="all-products d-flex justify-content-end">
            <div className="container-fluid mx-lg-4 mx-2">
                <div className="row d-flex flex-md-column justify-content-center">
                    <div className="p-0 row d-flex justify-content-xl-between justify-content-center align-items-start">
                        <div className="container">
                            <div className="row">
                                <div className="d-flex offset-md-3 text-center">
                                    <h4>Products</h4>
                                </div>
                                <div className="d-flex offset-md-3 text-center">
                                    <p className="mb-0">{sessionStorage.getItem("productsCount")} products available</p>
                                </div>

                                {isAdmin ?
                                    <div className="mb-3 d-flex justify-content-end">
                                        <NavigationLink
                                            route={`/products/table?page=1`}
                                            text={"View as Table"}
                                            className="text-center" />
                                        <div className="mx-1"></div>
                                    </div> :
                                undefined}

                            </div>
                        </div>

                        <div className={`${styles["filter"]} col-md-3 d-flex flex-column justify-content-center align-items-lg-start align-items-center mb-3`}>
                            <SideBarToggler toggleSidebar={toggleSidebar} />
                            <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                        </div>

                        <div className="col-md-9">
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
                {message && <Message message={message} messageType={messageType} />}
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 col-md-9">
                        <Pagination page={page} productsCount={sessionStorage.getItem("productsCount")} />
                    </div>
                </div>
            </div>
        </div >
    </>;
}

async function loadProductsData(page, categories, price, alpha) {
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

        let products = await allProducts(Number(page), categories, price, alpha);

        if (!products.ok) {
            sessionStorage.setItem("productsCount", 0);
            return redirect("/?message=Invalid Page!&type=danger");
        }

        const { productsRows, count } = await products.json();

        sessionStorage.setItem("productsCount", count);

        await storeImages(productsRows);

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
    const alpha = sessionStorage.getItem("alpha");

    //make good error handle
    if (!currentPage || isNaN(currentPage)) {
        return redirect("/?message=Invalid page number provided.&type=danger");
    }

    const page = Number(currentPage);

    return defer({
        productsRows: await loadProductsData(page, categories, price, alpha),
        page
    });
}
