import SideBar from "./SideBar";
import SideBarToggler from "./SideBarToggler";
import styles from "./css/FilterSidebar.module.css";
import { memo } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default memo(function FilterSidebar({ toggleSidebar, isSidebarVisible }) {
    return <motion.aside
        className={`${styles["filter"]} col-md-3 d-flex flex-column justify-content-center align-items-start mb-3`}
        initial={{ opacity: 0 }} // Start with the component invisible
        animate={{ opacity: 1 }} // Animate to fully visible
        transition={{ duration: 0.5 }}>
        <SideBarToggler toggleSidebar={toggleSidebar} />
        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
    </motion.aside>
})