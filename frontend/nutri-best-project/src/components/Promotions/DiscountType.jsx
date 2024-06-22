import styles from "./css/DiscountType.module.css";
import { OPTIONS } from "../../pages/promotions/PromotionForm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function DiscountType({ onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button type="button" className={styles["dropdown-button"]} onClick={() => setIsOpen(!isOpen)}>
                {selected || "Select discount type"}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles["dropdown-list"]}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.li
                            key={"none"}
                            className={styles["dropdown-item"]}
                            onClick={() => handleSelect("")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.0 }}
                        >
                            None
                        </motion.li>
                        {OPTIONS.map(c => (
                            <motion.li
                                key={c}
                                className={styles["dropdown-item"]}
                                onClick={() => handleSelect(c)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1.0 }}
                            >
                                {c}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}