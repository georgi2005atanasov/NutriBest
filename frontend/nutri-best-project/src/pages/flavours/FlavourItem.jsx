/* eslint-disable react/prop-types */
import styles from "./css/AllFlavours.module.css";
import { motion } from "framer-motion";

export default function FlavourItem({ flavour, onDelete }) {
    return <div className={styles["flavour-card"]}>
        <div className={styles["delete-icon"]}>
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={(event) => onDelete(event, flavour.name)}
            >
            </motion.i>
        </div>
        <p>{flavour.name}</p>
    </div>
}