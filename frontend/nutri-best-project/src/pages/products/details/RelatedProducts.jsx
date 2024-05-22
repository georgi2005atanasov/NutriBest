/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRelated } from "../../../../../../backend/api/products";
import ProductsList from "../ProductsList";

export default function RelatedProducts({ product }) {
    const [products, setProducts] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        async function getRelatedProducts() {
            const response = await getRelated(product.categories, product.productId);

            const data = await response.json();

            if (data.message) {
                setError(data.message)
            }

            setProducts(data);
        }

        getRelatedProducts();
    }, [setProducts, product]);

    return <div className="container-fluid d-flex flex-column">
        <h3 className="d-flex justify-content-center mb-5 mt-2">Related Products:</h3>
        {products && products.length != 0 && 
        <ProductsList productsRows={[products]} sizes="col-md-4 col-lg-3" />}
    </div>
}