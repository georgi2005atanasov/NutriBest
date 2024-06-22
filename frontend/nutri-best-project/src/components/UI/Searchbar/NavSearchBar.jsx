import useAuth from "../../../hooks/useAuth";
import searchBar from "./css/SearchBar.module.css";
import CategoriesList from "../../CategoriesList/CategoriesList";
import { getAuthToken } from "../../../utils/auth";
import { useSubmit } from "react-router-dom";
import { useRef } from "react";
import Search from "./Search";

// eslint-disable-next-line react/prop-types
export default function NavSearchBar({ categories }) {
    const text = useRef();
    const submit = useSubmit();
    const token = getAuthToken();

    const { isAdmin, isEmployee } = useAuth(token);

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
        return submit(null, { action: "/products/all", method: "GET" });
    }

    return <div className="col-md-4 d-flex flex-column p-1">
        <Search
            ref={text}
            styles={searchBar}
            isVerified={isAdmin || isEmployee}
            handleChange={handleChange}
            handleSearch={handleSearch}
        />
        <div className={`${searchBar["categories-wrapper"]} d-flex justify-content-between align-items-center`}>
            <CategoriesList categories={categories} isAdmin={isAdmin || isEmployee} />
        </div>
    </div>;
}