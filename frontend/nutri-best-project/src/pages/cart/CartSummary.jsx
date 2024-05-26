/* eslint-disable react/prop-types */
import styles from "./css/CartSummary.module.css";
import { motion } from "framer-motion";

const CartSummary = ({ cart }) => (
    <div className={styles["cart-summary"]}>
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
        <span className="p-2 card">Applied Promo Code: <strong>{cart && cart.code && cart.code}</strong></span>
    </div>
);

export default CartSummary;