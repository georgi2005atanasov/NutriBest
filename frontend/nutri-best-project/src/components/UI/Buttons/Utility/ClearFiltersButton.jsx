import styles from "../css/ClearFiltersButton.module.css";
import { cleanFilters } from "../../../../utils/utils";
import { CategoryBrandContext } from "../../../../store/CategoryBrandContext";
import { useSubmit } from "react-router-dom";
import { useContext } from "react";

export default function ClearFiltersButton() {
    const submit = useSubmit();
    const { setSelectedCategories } = useContext(CategoryBrandContext);

    function handleClearFilters() {
        cleanFilters();
        setSelectedCategories([]);
        submit(null);
    }

    return <button onClick={handleClearFilters} className={`${styles["clear-filters-btn"]} p-2 border-0 rounded-1 mt-1`}>
        <strong>Clear Filters</strong>
    </button>
}