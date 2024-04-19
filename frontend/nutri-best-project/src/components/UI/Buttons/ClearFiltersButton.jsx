import { useSubmit } from "react-router-dom";
import styles from "../css/SideBar.module.css";
import { useContext } from "react";
import { CategoryContext } from "../../../store/CategoryContext";

export default function ClearFiltersButton() {
    const submit = useSubmit();
    const { setSelectedCategories } = useContext(CategoryContext);

    function handleClearFilters() {
        sessionStorage.setItem("price", "");
        sessionStorage.setItem("categories", "");
        sessionStorage.setItem("alpha", "");

        setSelectedCategories([]);
        
        // const page = sessionStorage.getItem("page");
        // submit(`page=${page}`);
        submit(`page=1`);
    }

    return <button onClick={handleClearFilters} className={`${styles["clear-filters-btn"]} p-2 border-0 rounded-1 mt-1`}>
        <strong>Clear Filters</strong>
    </button>
}