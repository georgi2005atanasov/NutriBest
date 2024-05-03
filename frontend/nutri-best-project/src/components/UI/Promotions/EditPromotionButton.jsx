/* eslint-disable react/prop-types */
import styles from "./css/PromotionButtons.module.css";
import { motion } from "framer-motion";

export default function EditPromotionButton({ promotion }) {
    return <div>
        <motion.a
            className={styles["edit-promotion-btn"]}
            whileHover={{ scale: 0.99 }}
            href={`/promotions/edit/${promotion.promotionId}`}
        >
            Edit
        </motion.a>
    </div>;
}