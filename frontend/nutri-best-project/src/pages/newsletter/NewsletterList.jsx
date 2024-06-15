import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import UsersPagination from "../../components/UI/Pagination/UsersPagination";
import { subscribedToNewsletter } from "../../../../../backend/api/newsletter";
import { useLoaderData, useSubmit, useSearchParams, redirect } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function NewsletterList() {
    const searchText = useRef();
    const { data, page } = useLoaderData();
    const [orderToDelete, setOrderToDelete] = useState();
    const submit = useSubmit();
    const [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams(prev => {
                prev.delete("type");
                prev.delete("message");
                return prev;
            })
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }, [setSearchParams]);

    useEffect(() => {
        sessionStorage.setItem("search", ""); // cleans previous searches
    }, []);

    function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            return;
        }

        searchText.current.value = event.target.value;
    }

    async function handleSearch() {
        sessionStorage.setItem("search", searchText.current.value);
        return submit(null, { action: "/newsletter/list", method: "GET" });
    }

    return <>
        <Search
            ref={searchText}
            handleChange={handleChange}
            handleSearch={handleSearch}
            isVerified={true}
            styles={searchBarStyles}
            placeholder="Order, Phone Number, Customer Name..."
        />
        <UsersPagination

        />
    </>;
}

export async function loader({ request, params }) {
    try {
        const page = sessionStorage.getItem("newsletter-page");
        const response = await subscribedToNewsletter();
        const data = await response.json();
        return {
            page,
            data
        };
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}