/* eslint-disable react/prop-types */
import styles from "./css/CartSummary.module.css";
import { motion } from "framer-motion";

export default function CartSummary({ cart, handleCodeRemove, shippingDiscount, shippingPrice }) {
    return <div className={`${styles["cart-summary"]} mb-md-2 mb-0 mt-md-0 mt-3 mb-0`}>
        <motion.h6
            className={styles["total-price"]}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Total Products: {cart && cart.totalProducts && cart.totalProducts.toFixed(2)} BGN
        </motion.h6>
        <motion.h6
            className={styles["total-price"]}
        >
            Shipping: {(shippingPrice || shippingPrice == 0) ?
                <span>&nbsp;{shippingPrice.toFixed(2)} BGN</span> :
                <span className="text-danger">&nbsp;Choose Country at Checkout!</span>}
        </motion.h6>
        <motion.h6
            className={styles["total-saved"]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Saved: {cart && (cart.totalSaved || cart.totalSaved == 0) && (cart.totalSaved + (shippingDiscount || 0)).toFixed(2)} BGN
        </motion.h6>
        <motion.h2
            className={styles["total-price"]}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Total Price:&nbsp;{(cart &&
                cart.totalProducts &&
                (shippingPrice || shippingPrice == 0)) ?
                <span>{(shippingPrice + cart.totalProducts).toFixed(2)} BGN</span> :
                <span>{cart && cart.totalProducts && cart.totalProducts.toFixed(2)} BGN</span>}
        </motion.h2>
        {cart && cart.code &&
            <div className="d-flex justify-content-center align-items-start">
                <span className="p-2 card p-4 mt-3">
                    Applied Promo Code: <strong>{cart.code}</strong>
                </span>
                <span>
                    <i onClick={handleCodeRemove} className={`fa fa-times ${styles["remove-code-button"]}`} aria-hidden="true"></i>
                </span>
            </div>}
    </div>
}