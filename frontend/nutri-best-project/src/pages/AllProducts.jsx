import { useState } from "react";
import { allProducts } from "../../../../backend/api/api";
import { useLoaderData } from "react-router-dom";

export default function AllProducts() {
    // const [page, setPage] = useState(1);
    const products = useLoaderData();

    return <div className="all-products">
        {products && products.map(p => {
            const src = `data:${p.productImage.contentType};base64,${p.productImage.imageData}`;
            return <div key={p.name} className="product-list">
                <img src={src} alt="Dynamic" />
            </div>
        })}
    </div>
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    var products = await allProducts();

    return products;
}