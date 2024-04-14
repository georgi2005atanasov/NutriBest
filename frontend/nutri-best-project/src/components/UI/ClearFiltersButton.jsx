import { useSubmit } from "react-router-dom";
import styles from "./css/SideBar.module.css";

export default function ClearFiltersButton() {
    const submit = useSubmit();

    function handleClearFilters() {
        localStorage.setItem("price", "");
        localStorage.setItem("categories", "");
        const page = localStorage.getItem("page");
        submit(`page=${page}`);
    }

    return <button onClick={handleClearFilters} className={`${styles["clear-filters-btn"]} p-2 border-0 rounded-1 mt-1`}>
        <strong>Clear Filters</strong>
    </button>
}