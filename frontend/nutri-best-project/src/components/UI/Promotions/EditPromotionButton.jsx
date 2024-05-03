import styles from "./css/PromotionButtons.module.css";
import { motion } from "framer-motion";

export default function EditPromotionButton() {
    return <div>
        <motion.button
            className={styles["edit-promotion-btn"]}
        >
            Edit
        </motion.button>
    </div>;
}