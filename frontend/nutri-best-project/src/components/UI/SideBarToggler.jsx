import styles from "./css/SideBarToggler.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <div>
        <button onClick={toggleSidebar} className={`${styles["sidebar-toggler"]} d-flex d-xl-none mb-1`}>
            Filters
        </button>
    </div>
}