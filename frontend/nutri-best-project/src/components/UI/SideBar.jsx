import DropdownMenu from "./DropdownMenu";
import MultiSelectCategory from "./Form/MultiSelectCategory";
import PriceAscFilter from "./PriceAscFilter";
import PriceDescFilter from "./PriceDescFilter";
import styles from "./css/SideBar.module.css";
import { useContext, useEffect } from "react";
import { useSubmit } from "react-router-dom";
import { CategoryContext } from "../../store/CategoryContext";
import ClearFiltersButton from "./ClearFiltersButton";
import PriceNoneFilter from "./PriceNoneFilter";

// eslint-disable-next-line react/prop-types
export default function SideBar({ isVisible, toggleSidebar }) {
    const { selectedCategories } = useContext(CategoryContext);
    const price = localStorage.getItem("price");
    const page = localStorage.getItem("page");
    const localStorageCategories = localStorage.getItem("categories");
    console.log(price);
    const submit = useSubmit();

    useEffect(() => {
        let query = `?page=${page}`;

        if (selectedCategories && selectedCategories.length != 0) {
            localStorage.setItem("categories", localStorageCategories);
        }

        if (price && price != "") {
            localStorage.setItem("price", price);
        }

        if (localStorage.getItem("categories") != "") {
            query += `&categories=${localStorage.getItem("categories")}`;
        }
        if (price != "") {
            query += `&price=${price}`;
        }

        submit(query);
    }, [selectedCategories, submit, price, page, localStorageCategories]);

    return <>
        <div className={`${styles["filter-header"]} d-flex justify-content-between align-items-center`}>
            <h5>Filter by</h5> <i className="fa fa-filter" aria-hidden="true"></i>
        </div>
        <div className={`${styles["sidebar"]} d-flex flex-column ${isVisible ? styles['visible'] : 'd-none d-xl-flex'}`}>
            <div className="content">
                <div className={`${styles["filters-wrapper"]} d-flex flex-column`}>
                    <DropdownMenu text={"Category"}>
                        <h5 className="ms-3 mt-3">Choose:</h5>
                        <MultiSelectCategory isFilter={true} />
                    </DropdownMenu>

                    <div className="mb-1"></div>

                    <DropdownMenu text={"Price"}>
                        <div id="price-none">
                            <PriceNoneFilter />
                        </div>
                        <hr className="m-0" />
                        <div id="price-asc">
                            <PriceAscFilter />
                        </div>
                        <hr className="m-0" />
                        <div id="price-desc">
                            <PriceDescFilter />
                        </div>
                    </DropdownMenu>

                    <ClearFiltersButton />
                </div>

            </div>
            <div className="mb-1"></div>
            <button onClick={toggleSidebar} className="p-2 d-xl-none border-0 rounded-1">Close</button>
        </div>
    </>
}