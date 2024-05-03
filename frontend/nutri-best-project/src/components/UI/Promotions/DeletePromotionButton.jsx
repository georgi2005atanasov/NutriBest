import styles from "./css/PromotionButtons.module.css";
import { motion } from "framer-motion";

export default function DeletePromotionButton() {
    return <div>
        <motion.button
            className={styles["delete-promotion-btn"]}
        >
            Delete
        </motion.button>
    </div>;
}