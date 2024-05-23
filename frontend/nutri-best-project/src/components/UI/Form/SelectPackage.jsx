/* eslint-disable react/prop-types */
import styles from "./css/SelectPackage.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

export function SelectPackage({ packages, spec, setSpec }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!packages || packages.length === 0) {
        return null;
    }

    const handleSelect = (option) => {
        setSpec(prev => {
            return {...prev, grams: option};
        });
        setIsOpen(false);
    };

    return (
        <div className="dropdown d-flex flex-column justify-content-center align-items-center">
            <button type="button" className={`${styles["dropdown-button"]}`} onClick={() => setIsOpen(!isOpen)}>
                {spec.grams ? `${spec.grams}g` : `Package`}
            </button>
            {isOpen && (
                <div className="position-relative w-50">
                    <motion.ul
                        className={`${styles["dropdown-list"]}`}
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 1.0 }}
                            >
                                {p.grams}g
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            )}
        </div>
    );
}