import { useEffect, useState } from "react";
import { allProducts } from "../../../../../backend/api/api";
import { useLoaderData, redirect, useNavigation } from "react-router-dom";
import ProductList from "./ProductList";
import Pagination from "../../components/UI/Pagination";
import Loader from "../../components/UI/Loader";

const PRODUCTS_PER_PAGE = 4;

export default function AllProducts() {
    const [currentPage, setPage] = useState(0);
    const { products, page, totalPages } = useLoaderData();

    useEffect(() => {
        if (!page) {
            return;
        }

        setPage(page);
    }, [page, totalPages, products]);

    return <div className="all-products">
        <div className="container">
            <div className="row d-flex justify-content-center">
                {products && products.length != 0 && products.map(p => {
                    const src = `data:${p.productImage.contentType};base64,${p.productImage.imageData}`;
                    return <div className="col-sm-4 col-lg-3" key={p.name}>
                        <ProductList product={p} src={src} />
                    </div>;
                })}
            </div>
        </div>
        <Pagination
            totalPages={totalPages ? totalPages : 0}
            page={currentPage} />
    </div>
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

    return {
        products,
        page: page,
        totalPages: totalPages
    };
}