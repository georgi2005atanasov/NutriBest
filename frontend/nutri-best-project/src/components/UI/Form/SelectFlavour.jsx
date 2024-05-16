/* eslint-disable react/prop-types */
import styles from "./css/SelectPackage.module.css"; // using select package style
import { motion } from "framer-motion";
import { useState } from "react";

export default function SelectFlavour({ flavours, spec, setSpec }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!flavours || flavours.length === 0) {
        return null;
    }

    const handleSelect = (option) => {
        setSpec(prev => {
            prev.flavour = option;
            return prev;
        })
        setIsOpen(false);
    };

    return (
        <div className="dropdown d-flex flex-column justify-content-center align-items-center">
            <button type="button" className={`${styles["dropdown-button"]}`} onClick={() => setIsOpen(!isOpen)}>
                {spec && spec.flavour ? `${spec.flavour}` : `Flavour`}
            </button>
            {isOpen && (
                <motion.ul
                    className={`${styles["dropdown-list"]}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {flavours.map(x => (
                        <motion.li
                            key={x.name}
                            className={styles["dropdown-item"]}
                            onClick={() => handleSelect(x.name)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 1.0 }}
                        >
                            {x.name}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
}