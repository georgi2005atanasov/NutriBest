/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../css/ProductItem.module.css";
import AddToCartButton from "../../components/UI/Buttons/AddToCartButton";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";

export default function ProductItem({ product }) {
    const [src, setSrc] = useState('');
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);

    useEffect(() => {
        const src = localStorage.getItem(`image-${product.productId}`);
        setSrc(src);
    }, [product])

    return <section className={`${styles["product-item"]} card p-3`} id={product.productId}>
        <Link className={`${styles["product-item-link"]}`} to="/products/details/">
            <img className={styles["product-image"]} src={src} alt="Dynamic" />
            <h5 className="product-name text-center mt-2 mb-2">
                {product.name}
            </h5>
            <h5 className="product-price text-center mb-2">
                <span>{product.price.toFixed(2)} BGN</span>
            </h5>
        </Link>

        {isAdmin ?
            <div className="container pt-2">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-6 d-flex justify-content-center mb-1">
                        <Link to={`/products/${product.productId}`} className={styles["edit-btn"]}>Edit</Link>
                    </div>
                    <div className="col-6 d-flex justify-content-center mb-1">
                        <Link to={`/products/${product.productId}`} className={styles["delete-btn"]}>Delete</Link>
                    </div>
                </div>
            </div> :
            <AddToCartButton />}

    </section>
}