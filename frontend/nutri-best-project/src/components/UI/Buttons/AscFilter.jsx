import { Link } from "react-router-dom";
import styles from "./css/Filter.module.css";

// eslint-disable-next-line react/prop-types
export default function AscFilter({ text = "Ascending order", identifier }) {
    function handleAsc() {
        sessionStorage.setItem(identifier, "asc");
    }

    return <Link onClick={handleAsc} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-3">
            <strong>{text}</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-up d-flex align-items-center" aria-hidden="true"></i>
        </button>
    </Link>;
}