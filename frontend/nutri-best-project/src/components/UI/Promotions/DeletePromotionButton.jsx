/* eslint-disable react/prop-types */
import styles from "./css/PromotionButtons.module.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import DeletePromotionModal from "../../Modals/DeletePromotionModal";

export default function DeletePromotionButton({ promotion }) {
    const dialog = useRef();

    function handleDelete() {
        dialog.current.open();
    }

    return <div>
        <DeletePromotionModal promotionId={promotion.promotionId} ref={dialog} />
        <motion.a
            className={styles["delete-promotion-btn"]}
            whileHover={{ scale: 0.99 }}
            onClick={handleDelete}
        >
            Delete
        </motion.a>
    </div>;
}