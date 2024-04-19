import { memo } from "react";
import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";

const MainNavigation = memo(function MainNavigation() {
    return <div className={`container ${styles["main-navigation"]}`}>
        <div className="row d-flex justify-content-between align-items-start">
            <NavLogo styles={styles} />
            <NavToggler styles={styles} />
            <NavButtons styles={styles} />
        </div>
    </div>;
});

export default MainNavigation;