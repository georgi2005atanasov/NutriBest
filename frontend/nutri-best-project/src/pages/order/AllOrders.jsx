import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import Loader from "../../components/UI/Shared/Loader";
import Message from "../../components/UI/Shared/Message";
import OrdersPagination from "../../components/UI/Pagination/OrdersPagination";
import DeleteOrderModal from "../../components/Modals/Delete/DeleteOrderModal";
import OrderRow from "./OrderRow";
import { allOrders } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useNavigation, useSearchParams, useSubmit } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import OrdersSummary from "./OrdersSummary";

export default function AllOrders() {
    const dialog = useRef();
    const searchText = useRef();
    const { data, ordersPage } = useLoaderData();
    const [orderToDelete, setOrderToDelete] = useState();
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
    }, []);

    const handleDelete = useCallback(function handleDelete(orderId) {
        dialog.current.open();
        setOrderToDelete(orderId);
    }, []);

    const handleSearch = useCallback(async function handleSearch() {
        sessionStorage.setItem("search", searchText.current.value);
        return submit(null, { action: "/orders", method: "GET" });
    }, [submit]);

    const handleChange = useCallback( function handleChange(event) {
        if (event.key === "Enter") {
            handleSearch();
            return;
        }

        searchText.current.value = event.target.value;
    }, [handleSearch]);

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
        <div className="row mt-md-4 mt-0">
            {isLoading && <Loader />}
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
                <tbody className="">
                    {data && data.orders && data.orders.map(x => <OrderRow key={x.orderId} order={x} handleDelete={handleDelete} />)}
                </tbody>
            </table>
        </div>

        <OrdersSummary data={data} />

        <div className="mt-3">
            <OrdersPagination
                page={ordersPage}
                ordersCount={data.totalOrders} />
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    const ordersPage = Number(sessionStorage.getItem("orders-page"));
    const search = sessionStorage.getItem("search");
    const response = await allOrders(ordersPage, search);

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
        data: await response.json(),
        ordersPage
    };
}