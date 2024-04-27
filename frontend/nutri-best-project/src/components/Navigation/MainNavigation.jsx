import { memo } from "react";
import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import SearchBar from "../UI/Searchbar/SearchBar";

const MainNavigation = memo(function MainNavigation() {
    return <div id="main-navigation" className={`container ${styles["main-navigation"]} mt-md-4`}>
        <div className="row d-flex justify-content-between align-items-center">
            <NavLogo />
            <SearchBar />
            <NavToggler />
            <NavButtons />
        </div>
    </div>;
});

export default MainNavigation;