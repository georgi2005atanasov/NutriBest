import styles from "./css/PriceFilter.module.css";

export default function PriceAscFilter() {
    return <div className={`${styles["price-filter"]} p-2 d-flex justify-content-center align-items-center`}>
        <p className="text-center m-0 pe-3">
            <strong>Ascending order</strong>
        </p>
        <button className="mx-1 p-2 border-0">
            <i className="fa fa-arrow-up d-flex align-items-center" aria-hidden="true"></i>
        </button>
    </div>;
}