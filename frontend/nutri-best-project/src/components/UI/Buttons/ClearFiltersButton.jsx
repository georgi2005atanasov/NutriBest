import styles from "./css/ClearFiltersButton.module.css";
import { cleanFilters } from "../../../utils/utils";
import { CategoryContext } from "../../../store/CategoryContext";
import { useSubmit } from "react-router-dom";
import { useContext } from "react";

export default function ClearFiltersButton() {
    const submit = useSubmit();
    const { setSelectedCategories } = useContext(CategoryContext);

    function handleClearFilters() {
        cleanFilters();
        setSelectedCategories([]);
        submit(`page=1`);
    }

    return <button onClick={handleClearFilters} className={`${styles["clear-filters-btn"]} p-2 border-0 rounded-1 mt-1`}>
        <strong>Clear Filters</strong>
    </button>
}