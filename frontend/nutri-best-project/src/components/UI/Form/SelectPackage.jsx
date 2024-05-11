/* eslint-disable react/prop-types */
import styles from "./css/SelectPackage.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

export function SelectPackage({ packages }) {
    const [isOpen, setIsOpen] = useState(false);
    const [grams, setGrams] = useState(0);

    if (!packages || packages.length === 0) {
        return null;
    }

    const handleSelect = (option) => {
        setGrams(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown d-flex justify-content-center align-items-center">
            <button type="button" className={`${styles["dropdown-button"]}`} onClick={() => setIsOpen(!isOpen)}>
                {grams ? `${grams}g` : `Package`}
            </button>
            {isOpen && (
                <motion.ul
                    className={styles["dropdown-list"]}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {packages.map(p => (
                        <motion.li
                            key={p.grams}
                            className={styles["dropdown-item"]}
                            onClick={() => handleSelect(p.grams)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.0 }}
                        >
                            {p.grams}g
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
}