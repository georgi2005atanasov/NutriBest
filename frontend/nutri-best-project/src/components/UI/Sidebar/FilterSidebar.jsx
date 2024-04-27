import SideBar from "./SideBar";
import SideBarToggler from "./SideBarToggler";
import styles from "./css/FilterSidebar.module.css";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
export default memo(function FilterSidebar({ toggleSidebar, isSidebarVisible }) {
    return <div className={`${styles["filter"]} col-md-3 d-flex flex-column justify-content-center align-items-start mb-3`}>
        <SideBarToggler toggleSidebar={toggleSidebar} />
        <SideBar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
    </div>
})