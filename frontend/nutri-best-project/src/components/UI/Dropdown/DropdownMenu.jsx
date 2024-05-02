import { useState } from "react";
import styles from "./css/DropdownMenu.module.css";
import { AnimatePresence, motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function DropdownMenu({ children, text, filtersNumber = 0 }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return <motion.div
        className={styles["dropdown"]}
    >
        <button type={"button"} onClick={toggleMenu} className={`${styles["dropdown-button"]}`}>
            {text}
        </button>
        {filtersNumber != 0 ?
            <div className={styles["circle"]}>{filtersNumber}</div> :
            ""}

        {showMenu ? (<AnimatePresence>
            <motion.div
                className={styles["dropdown-menu"]}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    overflow: 'hidden',
                    transformOrigin: 'top'
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
        ) : undefined}
    </motion.div>
}