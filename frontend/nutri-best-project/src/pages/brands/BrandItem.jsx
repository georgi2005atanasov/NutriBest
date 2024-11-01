/* eslint-disable react/prop-types */
import styles from "./css/BrandItem.module.css";
import { motion } from "framer-motion";

export default function BrandItem({ onOpen, onClick, onDelete, brand, isVerified }) {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`${styles["brand-item"]} card d-flex`}
        onClick={(event) => onClick(event, brand.name)}
    >
        {isVerified == true ?
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={(event) => onDelete(event, brand)}
            >
            </motion.i> :
            ""}
        {brand.brandLogo &&
            <motion.i onClick={(event) => onOpen(event, brand)} className={`fa fa-info d-flex justify-content-end pe-1 pt-1 ${styles["details-icon"]}`} aria-hidden="true"></motion.i>}

        <div className="card-body p-3 position-relative text-center">
            {brand.name}
        </div>
    </motion.div>;
}