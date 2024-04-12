import MultiSelectCategory from "./Form/MultiSelectCategory";
import styles from "./css/SideBar.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBar({ isVisible, toggleSidebar }) {
    return <div className={`${styles["sidebar"]} d-flex flex-column ${isVisible ? styles['visible'] : 'd-none d-md-flex'}`}>
        <h5>Category</h5>
        <div className="content">
            <div className="choose-category">
                <MultiSelectCategory />
            </div>
        </div>
        <button onClick={toggleSidebar} className="d-md-none">Close</button>
    </div>
}