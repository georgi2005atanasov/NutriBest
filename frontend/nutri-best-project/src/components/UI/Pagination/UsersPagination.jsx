/* eslint-disable react/prop-types */
import styles from "./css/Pagination.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// might fetch these numbers, because they are coupled with the api
const USERS_PER_PAGE = 50;

export default function UsersPagination({ page, usersCount }) {
    const usersPerPage = USERS_PER_PAGE;
    const pagesCount = Math.ceil(Number(usersCount) / usersPerPage);

    const [startingPoint, setStartingPoint] = useState(1);

    let pagesComponent = [];

    useEffect(() => {
        if ((page) % 5 == 1 && startingPoint < page) {
            setStartingPoint(page);
            return;
        }

        if ((page) % 5 == 0 && startingPoint > page) {
            setStartingPoint(page - 4);
            return;
        }

        if ((page) % 5 == 1 && startingPoint > page) {
            setStartingPoint(page);
            return;
        }

        if ((page) % 5 == 0 && startingPoint > page) {
            setStartingPoint(page);
            return;
        }

        if (page == pagesCount) {
            if (page % 5 == 0) {
                setStartingPoint(page - 4);
            }
            else {
                setStartingPoint(page - page % 5 + 1);
            }
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
            sessionStorage.setItem("users-page", newPage);
        }
    }

    return (
        <div className={styles["pagination"]}>
            <NavLink
                className={page - 1 <= 0 ? "d-none" : ""}
                disabled={page - 1 <= 0}
                onClick={() => handlePageChange(page - 1)}>
                &laquo;
            </NavLink>
            {pagesComponent}
            {page != pagesCount ?
                <NavLink
                    key={pagesCount}
                    className={styles["pagination-dots"]}
                    onClick={() => handlePageChange(pagesCount)}
                    to="#"
                >
                    ...
                </NavLink>
                :
                ""}
            <NavLink
                className={page + 1 > pagesCount ? "d-none" : ""}
                disabled={page + 1 > pagesCount}
                onClick={() => handlePageChange(page + 1)}
            >
                &raquo;
            </NavLink>
        </div>
    );
}