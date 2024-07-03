/* eslint-disable react/prop-types */
import styles from "./css/OrderRelatedProduct.module.css";
import AddToCartRelatedProduct from "../../components/UI/Buttons/Products/AddToCartRelatedProduct";
import { getPrice } from "../../utils/products/productsHelper.js";
import { getImageByProductId } from "../../../../../backend/api/products";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrderRelatedProduct({ product, promotions }) {
    const [src, setSrc] = useState("");

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

    const isActivePromotion = promotions && promotions
        .filter(x => x.isActive)
        .some(x => x.promotionId == product.promotionId);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.9 }}
                className={`${styles["product-row"]} ${isActivePromotion ? styles["promotion"] : ''}`}
            >
                <img src={src} alt="Product" className={styles["product-image"]} />
                <div className={styles["product-details"]}>
                    {isActivePromotion ? (
                        <div className={styles["price-container"]}>
                            <span className={styles["discounted-price"]}>{getPrice(product.price, product.discountPercentage).toFixed(2)} BGN</span>
                            <span className={styles["original-price"]}>{product.price.toFixed(2)} BGN</span>
                        </div>
                    ) : (
                        <span className={styles["price"]}>{product.price.toFixed(2)} BGN</span>
                    )}
                    <span className={styles["name"]}>{product.name}</span>
                    <span className={styles["flavour"]}>{product.flavour}</span>
                    <span className={styles["grams"]}>{product.grams} grams</span>
                    <AddToCartRelatedProduct
                        productId={product.productId}
                        grams={product.grams}
                        flavour={product.flavour}
                        isValidPromotion={product.promotionId != null}
                        wrapperStyles="mt-3"
                        linkStyles="px-2 py-3" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}