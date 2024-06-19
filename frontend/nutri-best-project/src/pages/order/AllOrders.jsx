import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import Message from "../../components/UI/Shared/Message";
import OrdersPagination from "../../components/UI/Pagination/OrdersPagination";
import DeleteOrderModal from "../../components/Modals/Delete/DeleteOrderModal";
import OrderRow from "./OrderRow";
import { allOrders } from "../../../../../backend/api/orders";
import OrdersSummary from "./OrdersSummary";
import OrderStatusSelector from "./OrderStatusSelector";
import { motion } from "framer-motion";
import { Await, defer, redirect, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";

export default function AllOrders() {
    const dialog = useRef();
    const searchText = useRef();
    const [orderToDelete, setOrderToDelete] = useState();
    const [options, setOptions] = useState([]);
    const submit = useSubmit();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useLoaderData();

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
        sessionStorage.setItem("search", ""); // cleans previous searches
    }, []);

    useEffect(() => {
        sessionStorage.setItem("orders-filters", options.join("+"));
        sessionStorage.setItem("orders-page", 1);
        return submit(`?${options.join("+")}`, { action: "/orders", method: "GET" });
    }, [options, submit]);

    const handleDelete = useCallback(function handleDelete(orderId) {
        dialog.current.open();
        setOrderToDelete(orderId);
    }, []);

    const handleSearch = useCallback(async function handleSearch() {
        sessionStorage.setItem("search", searchText.current.value);
        return submit(null, { action: "/orders", method: "GET" });
    }, [submit]);

    const handleChange = useCallback(function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            return;
        }

        searchText.current.value = event.target.value;
    }, [handleSearch]);

    if (!isAdmin && !isEmployee) {
        return;
    }

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-md-2 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <DeleteOrderModal ref={dialog} orderId={orderToDelete} />
        <div className="mt-3 d-flex justify-content-start">
            <h2 className="mx-0 d-flex justify-content-center align-items-center">Orders</h2>
            <Search
                ref={searchText}
                handleChange={handleChange}
                handleSearch={handleSearch}
                isVerified={true}
                styles={searchBarStyles}
                placeholder="Order, Phone Number, Customer Name..."
            />
        </div>
        <OrderStatusSelector
            selectedOptions={options}
            setSelectedOptions={setOptions}
        />
        <div className="row mt-md-4 mt-0">
            {message && <Message addStyles={"mb-3"} message={message} messageType={messageType} />}
            <table className="">
                <thead >
                    <tr>
                        <th>Order</th>
                        <th>Is Finished</th>
                        <th>Is Confirmed</th>
                        <th>Made On</th>
                        <th>Is Shipped</th>
                        <th>Is Paid</th>
                        <th>Customer Name</th>
                        <th>Total Price</th>
                        <th>Is Anonymous</th>
                        <th>Details</th>
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
                                {resolvedData &&
                                    resolvedData.ordersData &&
                                    resolvedData.
                                        ordersData
                                        .orders.map(x => (
                                            <OrderRow key={x.orderId} order={x} handleDelete={handleDelete} />
                                        ))}
                            </tbody>
                        )}
                    </Await>
                </Suspense>
            </table>
        </div>

        <Suspense>
            <Await resolve={data}>
                {(resolvedData) => <>
                    <OrdersSummary data={resolvedData &&
                        resolvedData.ordersData} />

                    <div className="mt-3">
                        <OrdersPagination
                            page={resolvedData &&
                                resolvedData.ordersPage &&
                                resolvedData.ordersPage}
                            ordersCount={resolvedData &&
                                resolvedData.ordersData &&
                                resolvedData.ordersData.totalOrders} />
                    </div>
                </>}
            </Await>
        </Suspense>
    </motion.div>
}

async function loadOrders() {
    const ordersPage = Number(sessionStorage.getItem("orders-page"));
    const search = sessionStorage.getItem("search");
    const filters = sessionStorage.getItem("orders-filters");

    const response = await allOrders(ordersPage, search, filters);

    if (response == null) {
        return null;
    }

    if (!response) {
        return redirect("/login");
    }

    if (!response.ok) {
        return {
            data: [],
            ordersPage
        }
    }

    return {
        ordersData: await response.json(),
        ordersPage
    };
}

export function loader({ request, params }) {
    try {
        return defer({
            data: loadOrders(),
        });
    } catch (error) {
        return redirect("/error");
    }
}