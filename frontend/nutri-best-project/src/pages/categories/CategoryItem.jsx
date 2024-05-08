/* eslint-disable react/prop-types */
import { useRef } from "react";
import styles from "./css/CategoryItem.module.css";
import { motion } from "framer-motion";
import DeleteCategoryModal from "../../components/Modals/DeleteCategoryModal";
import { useSubmit } from "react-router-dom";

export default function CategoryItem({ category, isVerified }) {
    const submit = useSubmit();
    const dialog = useRef();

    const handleCategoryClick = (category) => {
        sessionStorage.setItem("categories", category);
        submit(null, { action: `/products/all`, method: "GET" });
    };

    async function handleDelete(event) {
        event.stopPropagation();
        dialog.current.open();
    }

    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -10, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`${styles["category-item"]} card`}
        onClick={() => handleCategoryClick(category.name)}
    >
        <DeleteCategoryModal ref={dialog} category={category.name} />
        {isVerified == true ?
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                whileHover={{ color: "red" }}
                onClick={(event) => handleDelete(event)}
            >
            </motion.i> :
            ""}
        <div className="card-body">
            {category.name}
        </div>
    </motion.div>;
}