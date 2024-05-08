import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { getAuthToken } from "../../../utils/auth";
import searchBar from "./css/SearchBar.module.css";
import { useSubmit } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ categories }) {
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
        sessionStorage.setItem("search", text.current.value);
        text.current.value = "";
        return submit(null, { action: "/products/all", method: "get" });
    }

    return <div className="col-md-4 d-flex flex-column">
        <div className="d-flex">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className={`p-0 col-lg-9 col-12 d-flex justify-content-center align-items-end ${searchBar["search-container"]}`}>
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
        <div className={`${searchBar["categories-wrapper"]} d-flex justify-content-between align-items-center`}>
            <CategoriesList categories={categories} isAdmin={isAdmin} />
        </div>
    </div>;
}