import { useState } from "react";
import styles from "./css/DropdownMenu.module.css";

// eslint-disable-next-line react/prop-types
export default function DropdownMenu({ children, text }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return <div className={styles["dropdown"]}>
        <button onClick={toggleMenu} className={`${styles["dropdown-button"]}`}>
            {text}
        </button>
        {showMenu && (<>
            <div className={styles["dropdown-menu"]}>
                {children}
            </div>
        </>
        )}
    </div>
}