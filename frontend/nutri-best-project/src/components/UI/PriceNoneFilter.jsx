import styles from "./css/PriceFilter.module.css";
import { Link } from "react-router-dom";

export default function PriceNoneFilter() {
    function handlePriceNone() {
        localStorage.setItem("price", "");
    }

    return <Link onClick={handlePriceNone} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-3">
            <strong>None</strong>
        </p>
    </Link>;
}