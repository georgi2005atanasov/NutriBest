import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import SearchBar from "../UI/Searchbar/SearchBar";
import ScrollingText from "./ScrollingText";
import { CategoryBrandContext } from "../../store/CategoryBrandContext";
import { motion } from "framer-motion";
import { memo, useContext } from "react";

const MainNavigation = memo(function MainNavigation() {
    const { categories } = useContext(CategoryBrandContext);

    return <>
        <ScrollingText />
        <motion.div
            id="main-navigation"
            className={`container-fluid me-5 ${styles["main-navigation"]}`}
        >
            <div
                className="row d-flex justify-content-between align-items-center"
            >
                <NavLogo />
                <SearchBar categories={categories} />
                <NavToggler />
                <NavButtons />
            </div>
        </motion.div>
    </>
});

export default MainNavigation;