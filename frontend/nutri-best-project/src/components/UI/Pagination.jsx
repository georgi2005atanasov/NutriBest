/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./css/Pagination.module.css";
import { useState, useEffect } from "react";
import { PRODUCTS_VIEWS } from "../../pages/Root";

const PRODUCTS_PER_PAGE = 6.0;
const PRODUCTS_PER_TABLE = 10.0;

export default function Pagination({ page, productsCount, productsView }) {
    const productsPerPage = productsView == PRODUCTS_VIEWS.all ?
        PRODUCTS_PER_PAGE :
        PRODUCTS_PER_TABLE;
    const pagesCount = Math.ceil(Number(productsCount) / productsPerPage);

    const [startingPoint, setStartingPoint] = useState(1);

    let pagesComponent = [];

    useEffect(() => {
        if (page > 5 && (page - 1) % 5 == 0) {
            setStartingPoint(page);
        }

        if (page < startingPoint) {
            setStartingPoint(startingPoint - page);
        }

    }, [page, startingPoint])

    for (let i = startingPoint; i <= Math.min(Number(pagesCount), startingPoint + 4); i++) {
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