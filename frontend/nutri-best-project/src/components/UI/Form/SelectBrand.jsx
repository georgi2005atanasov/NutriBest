import styles from "./css/SelectBrand.module.css";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryContext } from "../../../store/CategoryContext";

// eslint-disable-next-line react/prop-types
export default function SelectBrand({ onSelect, brand }) {
    const { brands } = useContext(CategoryContext);
    console.log(brands);
    console.log(brands);

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
                {selected || brand || "Select category (optional)"}
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