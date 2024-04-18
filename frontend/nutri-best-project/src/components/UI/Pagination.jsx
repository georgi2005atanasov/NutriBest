/* eslint-disable react/prop-types */
import { NavLink, useSubmit } from "react-router-dom";
import styles from "./css/Pagination.module.css";

export default function Pagination({ page, productsCount }) {
    const pagesCount = Math.ceil(productsCount / 6.0);
    let pagesComponent = [];

    for (let i = 1; i <= Math.min(pagesCount, 5); i++) { // Show up to 5 pages at a time
        pagesComponent.push(
            <NavLink 
                key={i} 
                className={page === i ? styles.active : ''} 
                onClick={() => handlePageChange(i)} 
                to="#" // Ideally, this would link to a route or modify the URL query params
            >
                {i}
            </NavLink>
        );
    }

    function handlePageChange(newPage) {
        sessionStorage.setItem("page", newPage.toString());
        // Here you would ideally trigger a state update or navigation
        // For example, you could call a method passed from the parent component
        // submit(newPage); // Uncomment or modify this line based on your actual use case
    }

    return (
        <div className={styles["pagination"]}>
            <NavLink 
                disabled={page <= 1} 
                onClick={() => handlePageChange(page - 1)}
                to="#"
            >
                &laquo;
            </NavLink>
            {pagesComponent}
            <NavLink 
                disabled={page >= pagesCount} 
                onClick={() => handlePageChange(page + 1)}
                to="#"
            >
                &raquo;
            </NavLink>
        </div>
    );
}