import styles from "./css/PriceFilter.module.css";

export default function PriceDescFilter() {
    return <div className={`${styles["price-filter"]} p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-2">
            <strong>Descending order</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
    </div>;
}