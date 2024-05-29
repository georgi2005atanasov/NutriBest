/* eslint-disable react/prop-types */
import styles from "./css/CartSummary.module.css";
import { motion } from "framer-motion";

const CartSummary = ({ cart, handleCodeRemove }) => (
    <div className={`${styles["cart-summary"]} mb-md-2 mb-0 mt-md-0 mt-3 mb-0`}>
        <motion.h2
            className={styles["total-price"]}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Total: {cart && cart.totalPrice && cart.totalPrice.toFixed(2)} BGN
        </motion.h2>
        <motion.h2
            className={styles["total-saved"]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Saved: {cart && cart.totalSaved && cart.totalSaved.toFixed(2)} BGN
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
);

export default CartSummary;