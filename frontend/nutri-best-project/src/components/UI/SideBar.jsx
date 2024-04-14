import DropdownMenu from "./DropdownMenu";
import MultiSelectCategory from "./Form/MultiSelectCategory";
import PriceAscFilter from "./PriceAscFilter";
import PriceDescFilter from "./PriceDescFilter";
import styles from "./css/SideBar.module.css";
import { useContext, useEffect } from "react";
import { CategoryContext } from "../../store/CategoryContext";

// eslint-disable-next-line react/prop-types
export default function SideBar({ isVisible, toggleSidebar }) {
    const {selectedCategories} = useContext(CategoryContext);

    
    // fetch certain products whilst creating a query string
    useEffect(() => {
        const 
    }, [selectedCategories]);

    return <>
        <div className={`${styles["filter-header"]} d-flex justify-content-between align-items-center`}>
            <h5>Filter by</h5> <i className="fa fa-filter" aria-hidden="true"></i>
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

                        {/* <button type="submit" className="p-2 border-0 rounded-1 mt-1">Apply Filters</button> */}
                    </div>

            </div>
            <div className="mb-1"></div>
            <button onClick={toggleSidebar} className="p-2 d-xl-none border-0 rounded-1">Close</button>
        </div>
    </>
}