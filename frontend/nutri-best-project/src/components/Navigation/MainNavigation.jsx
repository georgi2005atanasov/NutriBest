import { memo } from "react";
import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import SearchBar from "../UI/SearchBar";

const MainNavigation = memo(function MainNavigation() {
    return <div id="main-navigation" className={`container ${styles["main-navigation"]}`}>
        <div className="row d-flex justify-content-between align-items-center mt-5">
            <NavLogo styles={styles} />
            <SearchBar />
            <NavToggler styles={styles} />
            <NavButtons styles={styles} />
        </div>
    </div>;
});

export default MainNavigation;