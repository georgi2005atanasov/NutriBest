import styles from "../css/Filter.module.css";
import Filter from "./Filter";

// eslint-disable-next-line react/prop-types
export default function DescFilter({ text = "Descending order", identifier }) {
    function handleDesc() {
        sessionStorage.setItem(identifier, "desc");
    }

    return <Filter
        handler={handleDesc}
        text={text}
        styles={styles["price-filter"]}
    >
        <i className="fa fa-arrow-down d-flex align-items-center" aria-hidden="true" />
    </Filter>
}