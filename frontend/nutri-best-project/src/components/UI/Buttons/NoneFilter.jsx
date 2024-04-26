import styles from "./css/Filter.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NoneFilter({ identifier }) {
    function handleNone() {
        sessionStorage.setItem(identifier, "");
    }

    return <Link onClick={handleNone} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-3">
            <strong>None</strong>
        </p>
    </Link>;
}