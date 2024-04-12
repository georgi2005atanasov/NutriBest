/* eslint-disable react/prop-types */
// import styles from "./css/Pagination.module.css";

export default function Pagination({ totalPages, page }) {
    return <div className="d-flex">
        {totalPages} - total pages
        {page} - current pages
    </div>
}