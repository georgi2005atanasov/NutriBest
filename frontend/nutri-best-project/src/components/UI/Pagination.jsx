/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./css/Pagination.module.css";
import { useState, useEffect } from "react";

export default function Pagination({ page, productsCount }) {
    // const pagesCount = Math.ceil(Number(productsCount) / 6.0);
    const [startingPoint, setStartingPoint] = useState(1);
    const pagesCount = Math.ceil(Number(productsCount) / 1.0);
    let pagesComponent = [];

    useEffect(() => {
        if (page > 5 && (page - 1) % 5 == 0) {
            setStartingPoint(page);
        }

        if (page < startingPoint) {
            setStartingPoint(startingPoint - page);
        }
    }, [page, startingPoint])

    for (let i = startingPoint; i <= Math.min(Number(pagesCount), startingPoint + 4); i++) { // Show up to 5 pages at a time
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
        if (1 <= newPage && newPage <= pagesCount) {
            sessionStorage.setItem("page", newPage);
        }
    }

    return (
        <div className={styles["pagination"]}>
            <NavLink
                disabled={page - 1 <= 0}
                onClick={() => handlePageChange(page - 1)}
            >
                &laquo;
            </NavLink>
            {pagesComponent}
            <NavLink
                disabled={page + 1 > pagesCount}
                onClick={() => handlePageChange(page + 1)}
            >
                &raquo;
            </NavLink>
        </div>
    );
}