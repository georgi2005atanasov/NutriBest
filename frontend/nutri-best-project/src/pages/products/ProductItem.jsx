/* eslint-disable react/prop-types */
import alt from "../../assets/fallback-image.png";
import styles from "./css/ProductItem.module.css";
import DeleteProductButton from "../../components/UI/Buttons/Products/DeleteProductButton";
import EditProductButton from "../../components/UI/Buttons/Products/EditProductButton";
import MultiSelectPromotion from "../../components/Promotions/MultiSelectPromotion";
import { getImageByProductId } from "../../../../../backend/api/api";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import { getPrice } from "../../utils/products/productsHelper.js";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import AddToCartRedirect from "../../components/UI/Buttons/Products/AddToCartRedirect";

export default function ProductItem({ product }) {
    const [src, setSrc] = useState('');
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { promotions } = useLoaderData();
    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

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

    if (promotions.filter(x => x.isActive).some(x => x.promotionId == product.promotionId)) {
        return <AnimatePresence>
            <motion.section
                className={`${styles["promotion-wrapper"]} ${styles["product-item"]} card pb-2`}
                id={product.productId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.9 }}
            >
                {(isAdmin || isEmployee) && <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />}

                <div className={styles["promotion-box"]}>
                    {product && Math.floor(product.discountPercentage)} <strong>%</strong>
                </div>
                <Link className={`${styles["product-item-link"]}`} to={!isLoading && `/products/details/${product.productId}/${product.name}`}>
                    {src ? <img
                        className={`${styles["product-image"]} 
                ${styles["promotion-border"]}`}
                        src={src} alt="Dynamic" /> :
                        <img className={styles["fallback-image"]} src={alt} alt="Dynamic" />}

                    {(isAdmin || isEmployee) &&
                        <div className={`${styles["quantity-overlay"]}`}>
                            Left: {product.quantity}
                        </div>}

                    <h5 className={`${styles["promotion-name"]} product-name text-center mt-2 mb-2`}>
                        {product.name}
                    </h5>
                    <h5 className="product-price text-center mb-2">
                        <span className={styles["new-price"]}>
                            {getPrice(product.price, product.discountPercentage).toFixed(2)} BGN
                        </span>
                        <span className={styles["original-price"]}>
                            {(product.price).toFixed(2)} BGN
                        </span>
                    </h5>
                </Link>
                {(isAdmin || isEmployee) ?
                    <div className="container pt-1">
                        <div className="row d-flex justify-content-center align-items-center">
                            <EditProductButton productId={product.productId} />
                            <DeleteProductButton productId={product.productId} />
                        </div>
                    </div> : product.quantity > 0 ?
                        <AddToCartRedirect
                            isLoading={isLoading}
                            promotions={promotions}
                            product={product}
                        /> :
                        <h5 className="text-center text-danger">Out of Stock</h5>}
            </motion.section>
        </AnimatePresence>
    }

    return <AnimatePresence>
        <motion.section
            className={`${styles["product-item"]} card pb-2`}
            id={product.productId}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
        >
            {(isAdmin || isEmployee) && <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />}

            <Link className={`${styles["product-item-link"]}`} to={!isLoading && `/products/details/${product.productId}/${product.name}`}>
                {src ? <img
                    className={`${styles["product-image"]}`}
                    src={src} alt="Dynamic" /> :
                    <img className={styles["fallback-image"]} src={alt} alt="Dynamic" />}

                {(isAdmin || isEmployee) &&
                    <div className={`${styles["quantity-overlay"]}`}>
                        Left: {product.quantity}
                    </div>}

                <h5 className={`text-center mt-2 mb-2`}>
                    {product.name}
                </h5>
                <h5 className="product-price text-center mb-2">
                    <span>
                        {(product.price).toFixed(2)} BGN
                    </span>
                </h5>
            </Link>
            {(isAdmin || isEmployee) ?
                <div className="container pt-2">
                    <div className="row d-flex justify-content-center align-items-center">
                        <EditProductButton productId={product.productId} />
                        <DeleteProductButton productId={product.productId} />
                    </div>
                </div> : product.quantity > 0 ?
                    <AddToCartRedirect
                        isLoading={isLoading}
                        promotions={promotions}
                        product={product}
                    /> :
                    <h5 className="text-center text-danger">Out of Stock</h5>}
        </motion.section>
    </AnimatePresence>
}