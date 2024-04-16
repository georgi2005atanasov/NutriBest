import styles from "../css/Filter.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DescFilter({ text = "Descending order", identifier }) {
    function handleDesc() {
        sessionStorage.setItem(identifier, "desc");
    }

    return <Link onClick={handleDesc} className={`${styles["price-filter"]} text-decoration-none p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-2">
            <strong>{text}</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-down d-flex align-items-center" aria-hidden="true" />
        </button>
    </Link>;
}