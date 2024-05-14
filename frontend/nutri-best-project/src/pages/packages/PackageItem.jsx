import styles from "./css/AllPackages.module.css";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function PackageItem({ grams, onDelete }) {
    return <div className={styles["package-card"]}>
        <div className={styles["delete-icon"]}>
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={(event) => onDelete(event, grams)}
            >
            </motion.i>
        </div>
        <p>{grams}g</p>
    </div>
}