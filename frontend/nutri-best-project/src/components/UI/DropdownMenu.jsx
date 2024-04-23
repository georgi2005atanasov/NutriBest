import { useState } from "react";
import styles from "./css/DropdownMenu.module.css";

// eslint-disable-next-line react/prop-types
export default function DropdownMenu({ children, text, filtersNumber = 0 }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return <div className={styles["dropdown"]}>
        <button type={"button"} onClick={toggleMenu} className={`${styles["dropdown-button"]}`}>
            {text}
        </button>
        {filtersNumber != 0 ?
            <div className={styles["circle"]}>{filtersNumber}</div> :
            ""}

        {showMenu ? (<>
            <div className={styles["dropdown-menu"]}>
                {children}
            </div>
        </>
        ) : undefined}
    </div>
}