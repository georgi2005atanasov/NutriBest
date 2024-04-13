import DropdownMenu from "./DropdownMenu";
import MultiSelectCategory from "./Form/MultiSelectCategory";
import PriceAscFilter from "./PriceAscFilter";
import PriceDescFilter from "./PriceDescFilter";
import styles from "./css/SideBar.module.css";

// eslint-disable-next-line react/prop-types
export default function SideBar({ isVisible, toggleSidebar }) {
    return <>
        <div className={`${styles["filter-header"]}`}>
            <h5>Filter by</h5>
        </div>
        <div className={`${styles["sidebar"]} d-flex flex-column ${isVisible ? styles['visible'] : 'd-none d-xl-flex'}`}>
            <div className="content">
                <div className={`${styles["filters-wrapper"]} d-flex flex-column`}>
                    <DropdownMenu text={"Category"}>
                        <h5 className="ms-3 mt-3">Choose:</h5>
                        <MultiSelectCategory />
                    </DropdownMenu>

                    <div className="mb-1"></div>

                    <DropdownMenu text={"Price"}>
                        <PriceAscFilter />
                        <hr className="m-0" />
                        <PriceDescFilter />
                    </DropdownMenu>
                </div>
            </div>
            <div className="mb-1"></div>
            <button onClick={toggleSidebar} className="d-xl-none">Close</button>
        </div>
    </>
}