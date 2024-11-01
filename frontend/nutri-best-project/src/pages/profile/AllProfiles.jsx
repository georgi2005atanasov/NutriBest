import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import ProfileRow from "./ProfileRow";
import ProfileFilters from "../../components/Profile/ProfileFilters";
import Loader from "../../components/UI/Shared/Loader";
import Message from "../../components/UI/Shared/Message";
import Search from "../../components/UI/Searchbar/Search";
import UsersPagination from "../../components/UI/Pagination/UsersPagination";
import DownloadCsvOptionsButton from "../../components/UI/Buttons/Download/DownloadCsvOptionsButton";
import GrantModal from "../../components/UI/Modals/Admin/GrantModal";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { allProfiles, exportProfiles } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useLoaderData, useSearchParams, useNavigation, useSubmit, defer, Await } from "react-router-dom";
import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { getProfileFilters } from "../../utils/profiles/profilesHelper";

export default function AllProfiles() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    const dialog = useRef();
    const searchText = useRef();
    const selectedFilter = useRef("all");
    const [profileToGrant, setProfileToGrant] = useState({
        name: "",
        profileId: "",
        currentRoles: []
    });

    const { data } = useLoaderData();
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
        return () => {
            sessionStorage.setItem("search", ""); // cleans previous searches
            sessionStorage.setItem("users-page", 1); // cleans previous searches
            sessionStorage.setItem("users-group-type", "all");
        }
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

    const handleFilter = (groupType) => {
        selectedFilter.current = groupType;
        sessionStorage.setItem("users-group-type", selectedFilter.current);
        sessionStorage.setItem("users-page", 1);
        return submit(null, { action: "/profiles", method: "GET" });
    }

    const handleExport = useCallback(async function handleExport(withFilters) {
        const {
            search,
            groupType
        } = getProfileFilters();
        
        return await exportProfiles(withFilters,
            withFilters && search,
            withFilters && groupType
        )
    }, []);

    useEffect(() => {
        if (!isAdmin && !isEmployee) {
            return submit("message=Page Not Found!&type=danger",
                { action: "/", method: "GET" });
        }
    }, [isAdmin, isEmployee, submit]);

    if (!isAdmin && !isEmployee) {
        return;
    }

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
                    placeholder="Email, City, Name, Phone Number, Username, Role..."
                />
            </div>

            <ProfileFilters
                onSelectFilter={handleFilter}
                ref={selectedFilter}
            />

            <div className="row mt-md-2 mt-0">
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
                    <Suspense fallback={
                        <tbody className="text-center mt-2">
                            <tr>
                                <td>Loading...</td>
                            </tr>
                        </tbody>}>
                        <Await resolve={data}>
                            {(resolvedData) => <tbody>
                                {resolvedData.profilesData.profiles.map(x =>
                                    <ProfileRow
                                        key={x.profileId}
                                        profile={x}
                                        isAdmin={isAdmin}
                                        handleGrant={handleGrant} />)}
                            </tbody>}
                        </Await>
                    </Suspense>
                </table>
            </div>

            <div className="d-flex justify-content-end mt-1">
                <DownloadCsvOptionsButton
                    fileName="users"
                    exportFunction={handleExport} />
            </div>

            <Suspense>
                <Await resolve={data}>
                    {(resolvedData) => <>
                        <h3 className="m-3 text-end">Total Users: {resolvedData.profilesData.totalUsers}</h3>
                        <div className="mt-3">
                            <UsersPagination
                                page={resolvedData.usersPage}
                                usersCount={resolvedData.profilesData.totalUsers} />
                        </div>
                    </>
                    }
                </Await>
            </Suspense>
        </motion.div>
    </>
}

async function loadProfiles() {
    try {
        const {
            usersPage,
            search,
            groupType
        } = getProfileFilters();

        const profilesData = await allProfiles(usersPage, search, groupType);

        if (!profilesData) {
            return null;
        }

        return {
            profilesData,
            usersPage
        };
    } catch (error) {
        return null;
    }
}

export async function loader({ request, params }) {
    return defer({
        data: loadProfiles()
    });
}