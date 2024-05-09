/* eslint-disable react/prop-types */
import styles from "./css/CategoryItem.module.css";
import { motion } from "framer-motion";

export default function CategoryItem({ onClick, onDelete, category, isVerified }) {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`${styles["category-item"]} card`}
        onClick={() => onClick(category.name)}
    >
        {isVerified == true ?
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={(event) => onDelete(event, category.name)}
            >
            </motion.i> :
            ""}
        <div className="card-body">
            {category.name}
        </div>
    </motion.div>;
}