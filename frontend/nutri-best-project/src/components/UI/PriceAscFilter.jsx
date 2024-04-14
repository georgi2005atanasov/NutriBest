import { Link } from "react-router-dom";
import styles from "./css/PriceFilter.module.css";

export default function PriceAscFilter() {

    function handlePriceAsc() {
        document.getElementById("price-desc").style.backgroundColor = null;
        document.getElementById("price-none").style.backgroundColor = null;
        document.getElementById("price-asc").style.backgroundColor = "#f5f3e8";
        localStorage.setItem("price", "asc");
    }

    return <Link onClick={handlePriceAsc} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-3">
            <strong>Ascending order</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-up d-flex align-items-center" aria-hidden="true"></i>
        </button>
    </Link>;
}