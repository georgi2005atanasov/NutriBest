import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import Message from "../../components/UI/Shared/Message";
import UsersPagination from "../../components/UI/Pagination/UsersPagination";
import DownloadCsvOptionsButton from "../../components/UI/Buttons/Download/DownloadCsvOptionsButton";
import SubscriberRow from "./SubscriberRow";
import MessageSenders from "../../components/Newsletter/MessageSenders";
import NewsletterFilters from "../../components/Newsletter/NewsletterFilters";
import DeleteSubscriberModal from "../../components/UI/Modals/Delete/DeleteSubscriberModal";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { subscribedToNewsletter, exportNewsletter } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useLoaderData, useSubmit, useSearchParams, redirect, defer, Await } from "react-router-dom";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";

export default function NewsletterList() {
    const searchText = useRef();
    const dialog = useRef();
    const selectedFilter = useRef("all");
    const [subscriberToDelete, setSubscriberToDelete] = useState();
    const { data } = useLoaderData();
    const submit = useSubmit();
    const [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

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
        return () => {
            sessionStorage.setItem("search", "");
            sessionStorage.setItem("newsletter-group-type", "all");
            sessionStorage.setItem("users-page", 1);
        } // cleans previous searches
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

    const handleExport = useCallback(async function handleExport(withFilters) {
        return await exportNewsletter(withFilters,
            withFilters && sessionStorage.getItem("search"),
            withFilters && sessionStorage.getItem("newsletter-group-type")
        )
    }, []);

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found!&type=danger", {
            action: "/",
            method: "GET",
        });
    }

    return <motion.div
        className={`container-fluid overflow-y-hidden ${styles["table-wrapper"]} mb-4 mt-md-3 p-sm-4 p-1`}
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

        <Suspense>
            <Await resolve={data}>
                {(resolvedData) =>
                    <MessageSenders groupType={resolvedData && resolvedData.groupType} />}
            </Await>
        </Suspense>

        <div className="row mt-md-2 mt-0">
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
                <Suspense fallback={
                    <tbody className="text-center mt-2">
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>}>
                    <Await resolve={data}>
                        {(resolvedData) => (
                            <tbody>
                                {resolvedData && resolvedData.subscribersData.subscribers.map((x, index) =>
                                    <SubscriberRow
                                        key={`${x.email}-${index}`}
                                        subscriber={x}
                                        handleDelete={handleDelete}
                                    />)}
                            </tbody>)}
                    </Await>
                </Suspense>
            </table>
        </div>

        <div className="d-flex justify-content-end mb-5">
            <DownloadCsvOptionsButton
                fileName="newsletter"
                exportFunction={handleExport} />
        </div>

        <Suspense>
            <Await resolve={data}>
                {(resolvedData) => <UsersPagination
                    page={resolvedData && resolvedData.page}
                    usersCount={resolvedData && resolvedData.subscribersData.totalSubscribers}
                />}
            </Await>
        </Suspense>
        <div className="mb-5"></div>
    </motion.div>;
}

async function loadSubscribers() {
    const page = Number(sessionStorage.getItem("users-page"));
    const search = sessionStorage.getItem("search");
    const groupType = sessionStorage.getItem("newsletter-group-type");

    const response = await subscribedToNewsletter(page, search, groupType);

    if (response == null) {
        return response;
    }

    const subscribersData = await response.json();
    return {
        page,
        subscribersData,
        groupType
    };
}

export async function loader({ request, params }) {
    try {
        return defer({
            data: loadSubscribers()
        });
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}