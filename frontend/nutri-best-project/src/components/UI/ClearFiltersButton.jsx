import { useSubmit } from "react-router-dom";
import styles from "./css/SideBar.module.css";
import { useContext } from "react";
import { CategoryContext } from "../../store/CategoryContext";

export default function ClearFiltersButton() {
    const submit = useSubmit();
    const { setSelectedCategories } = useContext(CategoryContext);

    function handleClearFilters() {
        localStorage.setItem("price", "");
        localStorage.setItem("categories", "");

        setSelectedCategories([]);
        
        const page = localStorage.getItem("page");
        submit(`page=${page}`);
    }

    return <button onClick={handleClearFilters} className={`${styles["clear-filters-btn"]} p-2 border-0 rounded-1 mt-1`}>
        <strong>Clear Filters</strong>
    </button>
}