import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";
import searchBar from "./css/SearchBar.module.css";
import { useSubmit } from "react-router-dom";

export default function SearchBar() {
    const text = useRef();
    const submit = useSubmit();
    const token = getAuthToken();

    const { isAdmin } = useAuth(token);

    function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            text.current.blur();
            return;
        }

        text.current.value = event.target.value;
    }

    async function handleSearch() {
        submit("message=Yeeeeee&type=success", { action: "/products/all", method: "get" });
    }

    return <div className="col-md-4">
        <div className="d-flex">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className={`col-12 d-flex justify-content-center align-items-end ${searchBar["search-container"]}`}>
                            <input
                                className={`${searchBar["search-bar"]} ${isAdmin ? searchBar["search-bar-admin"] : ""}`}
                                id="search"
                                ref={text}
                                type="text"
                                name="search"
                                onKeyDown={(event) => handleChange(event)}
                                placeholder="Search" />
                            <label onClick={handleSearch} htmlFor="search" className={searchBar["search-icon"]}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}