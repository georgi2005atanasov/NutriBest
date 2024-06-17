import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import Loader from "../../components/UI/Shared/Loader";
import Message from "../../components/UI/Shared/Message";
import SubscriberRow from "./SubscriberRow";
import MessageSenders from "./MessageSenders";
import DeleteSubscriberModal from "../../components/Modals/Delete/DeleteSubscriberModal";
import UsersPagination from "../../components/UI/Pagination/UsersPagination";
import NewsletterFilters from "./NewsletterFilters";
import { subscribedToNewsletter } from "../../../../../backend/api/newsletter";
import { motion } from "framer-motion";
import { useLoaderData, useSubmit, useSearchParams, redirect, useNavigation } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";

export default function NewsletterList() {
    const searchText = useRef();
    const dialog = useRef();
    const selectedFilter = useRef();
    const [subscriberToDelete, setSubscriberToDelete] = useState();
    const { data, page, groupType } = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();
    const isLoading = navigation.state == "loading";
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
        sessionStorage.setItem("users-page", 1); // cleans previous searches
    }, []);

    const handleDelete = useCallback(function handleDelete(email) {
        dialog.current.open();
        setSubscriberToDelete(email);
    }, []);

    const handleSearch = useCallback(async function handleSearch() {
        sessionStorage.setItem("search", searchText.current.value);
        return submit(null, { action: "/newsletter/list", method: "GET" });
    }, [submit]);

    const handleFilter = useCallback(async function handleSearch(groupType) {
        selectedFilter.current = groupType;
        sessionStorage.setItem("newsletter-group-type", selectedFilter.current);
        return submit(null, { action: "/newsletter/list", method: "GET" });
    }, [submit]);

    const handleChange = useCallback(function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            return;
        }

        searchText.current.value = event.target.value;
    }, [handleSearch]);

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-md-3 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <DeleteSubscriberModal ref={dialog} email={subscriberToDelete} />
        <div className="d-flex justify-content-start">
            <h2 className="mx-0 d-flex justify-content-center align-items-center">Newsletter List</h2>
            <Search
                ref={searchText}
                handleChange={handleChange}
                handleSearch={handleSearch}
                isVerified={true}
                styles={searchBarStyles}
                placeholder="Order, Phone Number, Customer Name..."
            />
        </div>

        <NewsletterFilters
            ref={selectedFilter}
            onSelectFilter={handleFilter}
        />

        <MessageSenders groupType={groupType} />

        <div className="row mt-md-2 mt-0">
            {isLoading && <Loader />}
            {message && <Message addStyles={"mb-3"} message={message} messageType={messageType} />}
            <table className="mb-3">
                <thead >
                    <tr>
                        <th>Email</th>
                        <th>Is Anonymous</th>
                        <th>Total Orders</th>
                        <th>Registered On</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.subscribers && data.subscribers.map((x, index) =>
                        <SubscriberRow
                            key={`${x.email}-${index}`}
                            subscriber={x}
                            handleDelete={handleDelete}
                        />)}
                </tbody>
            </table>
        </div>
        <UsersPagination
            page={page}
            usersCount={data.totalSubscribers}
        />
    </motion.div>;
}

export async function loader({ request, params }) {
    try {
        const page = Number(sessionStorage.getItem("users-page"));
        const search = sessionStorage.getItem("search");
        const groupType = sessionStorage.getItem("newsletter-group-type");

        const response = await subscribedToNewsletter(page, search, groupType);
        const data = await response.json();
        return {
            page,
            data,
            groupType
        };
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}