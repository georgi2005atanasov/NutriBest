/* eslint-disable react/prop-types */
import OrderRelatedProduct from "../products/OrderRelatedProduct";
import styles from "./css/OrderRelatedProducts.module.css";
import { getOrderRelatedProducts } from "../../../../../backend/api/orders";
import { allPromotions } from "../../../../../backend/api/promotions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrderRelatedProducts({ totalProducts,
    shippingPrice,
    shippingPriceWithDiscount,
    minimumPrice }) {
    const [relatedProducts, setRelatedProducts] = useState();
    const [promotions, setPromotions] = useState();

    useEffect(() => {
        async function handleRelatedProducts() {
            const response = await getOrderRelatedProducts(minimumPrice - totalProducts);

            if (response.ok) {
                const products = await response.json();
                setRelatedProducts(products);
            }

            const promotions = await allPromotions();

            setPromotions(promotions);
        }

        if (minimumPrice > totalProducts) {
            handleRelatedProducts();
        }
    }, [minimumPrice, totalProducts]);

    if (shippingPrice == shippingPriceWithDiscount) {
        return <></>;
    }

    return <motion.div
        className={`${styles["orders-related"]} position-absolute`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        {(totalProducts < minimumPrice) || !minimumPrice ?
            <div className={`${styles["order-message-wrapper"]}`}>
                <h4 className={styles["order-message"]}>
                    Save <strong>{(shippingPrice - shippingPriceWithDiscount).toFixed(2)}BGN</strong> From Shipping by Buying:
                </h4>
                <div className="mt-3"></div>
                {relatedProducts && relatedProducts.products.map(product =>
                    <OrderRelatedProduct
                        key={`${product.productId}-${product.flavour}-${product.grams}`}
                        product={product}
                        promotions={promotions}
                    />
                )}
            </div>
            :
            <div className={styles["order-message-wrapper"]}>
                <h4 className={`${styles["order-message"]} text-success`}>
                    You Saved <strong>{(shippingPrice - shippingPriceWithDiscount).toFixed(2)}BGN</strong> From Shipping!
                </h4>
            </div>}
    </motion.div>
}