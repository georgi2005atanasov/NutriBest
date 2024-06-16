import styles from "../css/Table.module.css";
import ProfileRow from "./ProfileRow";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Loader from "../../components/UI/Shared/Loader";
import Message from "../../components/UI/Shared/Message";
import Search from "../../components/UI/Searchbar/Search";
import UsersPagination from "../../components/UI/Pagination/UsersPagination";
import GrantModal from "../../components/Modals/Profile/GrantModal";
import { allProfiles } from "../../../../../backend/api/profile";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams, useNavigation, useSubmit } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

export default function AllProfiles() {
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);

    const dialog = useRef();
    const searchText = useRef();
    const [profileToGrant, setProfileToGrant] = useState({
        name: "",
        profileId: "",
        currentRoles: []
    });

    const { data, usersPage } = useLoaderData();
    let [searchParams, setSearchParams] = useSearchParams();
    const submit = useSubmit();

    const navigation = useNavigation();
    const isLoading = navigation.state == "loading";

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

    const handleSearch = useCallback(async function handleSearch() {
        sessionStorage.setItem("search", searchText.current.value);
        return submit(null, { action: "/profiles", method: "GET" });
    }, [submit]);

    const handleChange = useCallback(function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            return;
        }
        searchText.current.value = event.target.value;
    }, [handleSearch]);

    const handleGrant = useCallback(function handleGrant(name, profileId, currentRoles) {
        if (currentRoles == "Administrator") {
            return;
        }

        setProfileToGrant({
            name,
            profileId,
            currentRoles: currentRoles.split(", ")
        })

        dialog.current.open();
    }, []);

    return <>
        <GrantModal ref={dialog} profile={profileToGrant} />
        <motion.div
            className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-md-2 p-sm-4 p-1`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.9 }}
        >
            <div className="mt-3 d-flex justify-content-start">
                <h2 className="mx-0 d-flex justify-content-center align-items-center">Profiles</h2>
                <Search
                    ref={searchText}
                    handleChange={handleChange}
                    handleSearch={handleSearch}
                    isVerified={true}
                    styles={searchBarStyles}
                    placeholder="Email, City, Name, Phone Number, Role..."
                />
            </div>
            <div className="row mt-md-4 mt-0">
                {isLoading && <Loader />}
                {message && <Message addStyles={"mb-3"} message={message} messageType={messageType} />}
                <table className="">
                    <thead >
                        <tr>
                            <th>Username</th>
                            <th>Made On</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Total Orders</th>
                            <th>Total Spent</th>
                            <th>Role</th>
                            <th>Actions</th>
                            <th>Is Deleted</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {data && data.profiles && data.profiles.map(x =>
                            <ProfileRow
                                key={x.profileId}
                                profile={x}
                                isAdmin={isAdmin}
                                handleGrant={handleGrant} />)}
                    </tbody>
                </table>
            </div>

            <h3 className="m-3 text-end">Total Users: {data.totalUsers}</h3>

            <div className="mt-3">
                <UsersPagination
                    page={usersPage}
                    usersCount={data.totalUsers} />
            </div>
        </motion.div>
    </>
}

export async function loader({ request, params }) {
    const usersPage = Number(sessionStorage.getItem("users-page")); // get from session storage
    const search = sessionStorage.getItem("search");
    const data = await allProfiles(usersPage, search);

    if (!data) {
        return redirect("/login");
    }

    return {
        data,
        usersPage
    };
}