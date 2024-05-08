import styles from "./css/PromotionCategory.module.css";
import { CategoryContext } from "../../../store/CategoryContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function PromotionCategory({ onSelect, category }) {
    const { categories } = useContext(CategoryContext);

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
                {selected || category || "Select category (optional)"}
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
                        {categories.map(c => (
                            <motion.li
                                key={c.name}
                                className={styles["dropdown-item"]}
                                onClick={() => handleSelect(c.name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1.0 }}
                            >
                                {c.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}