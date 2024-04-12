import { useEffect, useState } from "react";
import { allProducts } from "../../../../../backend/api/api";
import { useLoaderData, redirect } from "react-router-dom";
import ProductList from "./ProductList";
import Pagination from "../../components/UI/Pagination";
import SideBar from "../../components/UI/SideBar";
import SideBarToggler from "../../components/UI/SideBarToggler";
import CategoryContextProvider from "../../store/CategoryContext";
import styles from "../css/AllProducts.module.css";

const PRODUCTS_PER_PAGE = 6;
const PRODUCTS_PER_ROW = 3;

export default function AllProducts() {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const [currentPage, setPage] = useState(0);
    const { page, totalPages, productsRows } = useLoaderData();

    console.log(productsRows);

    useEffect(() => {
        if (!page) {
            return;
        }

        setPage(page);
    }, [page, totalPages, productsRows]);

    return <CategoryContextProvider>
        <div className="all-products d-flex justify-content-end">
            <div className="container">
                <div className="row d-flex flex-md-column justify-content-center">
                    <div className="row d-flex justify-content-between align-items-start">
                        <div className={`${styles["filters"]} col-md-3 d-flex flex-column}`}>
                            <SideBarToggler toggleSidebar={toggleSidebar} />
                            <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                        </div>

                        <div className="col-md-9">
                            {productsRows && productsRows.length != 0 && productsRows.map(row => {
                                return <div key={row[0].name} className="row d-flex justify-content-between mb-4">
                                    {row.map(p => {
                                        const src = `data:${p.productImage.contentType};base64,${p.productImage.imageData}`;
                                        return <div className="col-md-3 col-lg-4" key={p.name}>
                                            <ProductList product={p} src={src} />
                                        </div>;
                                    })}
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Pagination
                        totalPages={totalPages ? totalPages : 0}
                        page={currentPage} />
                </div>
            </div>
        </div>
    </CategoryContextProvider>

}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const url = new URL(request.url);

    const query = url.searchParams.get("page");

    if (isNaN(query)) {
        return null;
    }

    const page = Number(query) - 1;
    let products = await allProducts(Number(query) - 1);
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

    if (!products.ok) {
        return redirect("/?message=Invalid Page!&type=danger");
    }

    products = await products.json();

    let productsRows = [];
    let i = 0;
    let row = [];

    for (let j = i; j < products.length; j++) {
        if (j % PRODUCTS_PER_ROW == 0 && j != 0) {
            productsRows.push(row);
            row = [];
        }

        row.push(products[j]);
    }

    if (row.length > 0) {
        productsRows.push(row);
    }

    return {
        page,
        totalPages,
        productsRows
    };
}