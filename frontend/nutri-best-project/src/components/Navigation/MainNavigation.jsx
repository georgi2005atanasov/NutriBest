import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import SearchBar from "../UI/Searchbar/SearchBar";
import ScrollingText from "./ScrollingText";
import { CategoryContext } from "../../store/CategoryContext";
import { motion } from "framer-motion";
import { memo, useContext } from "react";

const MainNavigation = memo(function MainNavigation() {
    const { categories } = useContext(CategoryContext);

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
                <SearchBar categories={categories} />
                <NavToggler />
                <NavButtons />
            </div>
        </motion.div>
    </>
});

export default MainNavigation;