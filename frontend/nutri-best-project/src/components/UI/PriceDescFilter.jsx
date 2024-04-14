import styles from "./css/PriceFilter.module.css";
import { Link } from "react-router-dom";

export default function PriceDescFilter() {
    function handlePriceDesc() {
        document.getElementById("price-asc").style.backgroundColor = null;
        document.getElementById("price-none").style.backgroundColor = null;
        document.getElementById("price-desc").style.backgroundColor = "#f5f3e8";
        localStorage.setItem("price", "desc");
    }

    return <Link onClick={handlePriceDesc} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-2">
            <strong>Descending order</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-down d-flex align-items-center" aria-hidden="true" />
        </button>
    </Link>;
}