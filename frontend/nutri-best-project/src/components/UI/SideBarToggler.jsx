import styles from "./css/SideBarToggler.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <div>
        <button onClick={toggleSidebar} className={`${styles["sidebar-toggler"]} d-flex d-xl-none`}>
            {/* You can add an icon or text for the toggler here */}
            Filters
        </button>
    </div>
}