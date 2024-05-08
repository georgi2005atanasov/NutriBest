import styles from "../css/Filter.module.css";
import Filter from "./Filter";

// eslint-disable-next-line react/prop-types
export default function NoneFilter({ identifier }) {
    function handleNone() {
        sessionStorage.setItem(identifier, "");
    }

    return <Filter
        handler={handleNone}
        text={"None"}
        styles={styles["price-filter"]}
    >
    </Filter>
}