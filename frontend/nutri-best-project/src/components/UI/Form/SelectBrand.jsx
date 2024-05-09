/* eslint-disable react/prop-types */
import styles from "./css/SelectBrand.module.css";
import { CategoryBrandContext } from "../../../store/CategoryBrandContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";

export default function SelectBrand({ onSelect, brand }) {
    const { brands } = useContext(CategoryBrandContext);

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(brand && brand.name || "");

    const handleSelect = (option) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button type="button" className={`${styles["dropdown-button"]}`} onClick={() => setIsOpen(!isOpen)}>
                {selected || brand || `Select Brand`}
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
                        {brands.map(b => (
                            <motion.li
                                key={b.name}
                                className={styles["dropdown-item"]}
                                onClick={() => handleSelect(b.name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1.0 }}
                            >
                                {b.name}
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}