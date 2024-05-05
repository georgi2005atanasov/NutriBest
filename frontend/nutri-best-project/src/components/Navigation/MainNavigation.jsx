import { memo } from "react";
import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import SearchBar from "../UI/Searchbar/SearchBar";
import { motion } from "framer-motion";
import ScrollingText from "./ScrollingText";

const MainNavigation = memo(function MainNavigation() {
    return <>
        <ScrollingText text={"🎉 Special Promotion: 20% off on all items until midnight! 🎉"} />
        <motion.div
            id="main-navigation"
            className={`container-fluid me-5 ${styles["main-navigation"]}`}
        >
            <div
                className="row d-flex justify-content-between align-items-center"
            >
                <NavLogo />
                <SearchBar />
                <NavToggler />
                <NavButtons />
            </div>
        </motion.div>
    </>
});

export default MainNavigation;