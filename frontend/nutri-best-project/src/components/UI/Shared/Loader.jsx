/* eslint-disable react/prop-types */
import styles from "./css/Loader.module.css";
import { motion } from "framer-motion";

export default function Loader() {
    return <motion.div
        className={styles["loading-screen"]}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.6 }}
    >
        <div className={styles["loading"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </motion.div>
}