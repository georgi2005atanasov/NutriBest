import styles from "./css/SideBarToggler.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <div>
        <button onClick={toggleSidebar} className={`${styles["sidebar-toggler"]} w-75 align-items-center justify-content-between d-flex d-xl-none mb-1`}>
            Filters <i className="fa fa-filter" aria-hidden="true"></i>
        </button>
    </div>
}