/* eslint-disable react/prop-types */
import styles from "./css/ProductItem.module.css";
import alt from "../../assets/fallback-image.png";
import { Link } from "react-router-dom";
import AddToCartButton from "../../components/UI/Buttons/AddToCartButton";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import DeleteProductButton from "../../components/UI/Buttons/DeleteProductButton";
import EditProductButton from "../../components/UI/Buttons/EditProductButton";
import { getImageByProductId } from "../../../../../backend/api/api";

export default function ProductItem({ product }) {
    const [src, setSrc] = useState('');
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);

    useEffect(() => {
        async function getImage(productId) {
            const image = await getImageByProductId(productId);
            setSrc(`data:${image.contentType};base64,${image.imageData}`);
        }

        const src = localStorage.getItem(`image-${product.productId}`);

        if (!src) {
            getImage(product.productId);
            return;
        }

        setSrc(src);
    }, [product])

    return <section
        className={`${product.promotionId && styles["promotion-wrapper"]} ${styles["product-item"]} card p-3`}
        id={product.productId}>
        {product.promotionId &&
            <div className={styles["promotion-box"]}>
                {product && Math.floor(product.discountPercentage)} %
            </div>}
        <Link className={`${styles["product-item-link"]}`} to="/products/details/">
            {src ? <img
                className={`${styles["product-image"]} 
                ${product.promotionId && styles["promotion-border"]}`}
                src={src} alt="Dynamic" /> :
                <img className={styles["fallback-image"]} src={alt} alt="Dynamic" />}
            <h5 className={`${product.promotionId && styles["promotion-name"]} product-name text-center mt-2 mb-2`}>
                {product.name}
            </h5>
            <h5 className="product-price text-center mb-2">
                {product.promotionId &&
                    <span className={styles["new-price"]}>
                        {getPrice(product.price, product.discountPercentage).toFixed(2)} BGN
                    </span>}
                <span className={product.promotionId && styles["original-price"]}>
                    {(product.price).toFixed(2)} BGN
                </span>
            </h5>
        </Link>

        {isAdmin ?
            <div className="container pt-2">
                <div className="row d-flex justify-content-center align-items-center">
                    <EditProductButton productId={product.productId} />
                    <DeleteProductButton productId={product.productId} />
                </div>
            </div> :
            <AddToCartButton promotionId={product.promotionId} />}

    </section>
}

function getPrice(price, discountPercentage) {
    return price * ((100 - discountPercentage) / 100);
}