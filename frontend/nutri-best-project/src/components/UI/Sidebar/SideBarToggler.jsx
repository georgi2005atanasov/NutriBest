import styles from "./css/SideBarToggler.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBarToggler({ toggleSidebar }) {
    return <div className="d-flex justify-content-start w-100 ms-4">
        <button onClick={toggleSidebar} className={`${styles["sidebar-toggler"]} ms-5 w-100 align-items-center justify-content-between d-flex d-xl-none mb-1`}>
            Filters <i className="fa fa-filter" aria-hidden="true"></i>
        </button>
    </div>
}