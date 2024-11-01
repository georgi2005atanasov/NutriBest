import styles from "../css/Table.module.css";
import MyOrderRow from "./MyOrderRow";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import OrdersPagination from "../../components/UI/Pagination/OrdersPagination";
import { getUserOrders } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSubmit, defer, Await } from "react-router-dom";
import { useRef, useEffect, Suspense } from "react";

export default function MyOrders() {
    const searchText = useRef();
    const { data } = useLoaderData();
    const submit = useSubmit();
    
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
        return submit(null, { action: "/my-orders", method: "GET" });
    }

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-md-2 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <div className="mt-3 d-flex justify-content-start">
            <h2 className="mx-0 d-flex justify-content-center align-items-center">Orders</h2>
            <Search
                ref={searchText}
                handleChange={handleChange}
                handleSearch={handleSearch}
                isVerified={true}
                styles={searchBarStyles}
                placeholder="Order"
            />
        </div>
        <div className="row mt-md-4 mt-0">
            <table className="">
                <thead >
                    <tr>
                        <th>Order</th>
                        <th>Is Finished</th>
                        <th>Is Confirmed</th>
                        <th>Made On</th>
                        <th>Is Shipped</th>
                        <th>Is Paid</th>
                        <th>Total Price</th>
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
                        {(resolvedData) =>
                            <tbody className="">
                                {resolvedData.ordersData.orders.map(x => <MyOrderRow key={x.orderId} order={x} />)}
                            </tbody>}
                    </Await>
                </Suspense>
            </table>
        </div>

        <Suspense>
            <Await resolve={data}>
                {(resolvedData) => <>
                    <h3 className="text-center mt-3">Total Orders: {resolvedData.ordersData.totalOrders}</h3>
                    <div className="mt-3">
                        <OrdersPagination
                            page={resolvedData.ordersPage}
                            ordersCount={resolvedData.ordersData.totalOrders} />
                    </div>
                </>}
            </Await>
        </Suspense>
    </motion.div>
}

async function loadMyOrders() {
    const ordersPage = Number(sessionStorage.getItem("orders-page"));
    const search = sessionStorage.getItem("search");

    const response = await getUserOrders(ordersPage, search);

    if (response && !response.ok) {
        return redirect("/?message=Access Denied!&type=danger");
    }

    const ordersData = await response.json();

    return {
        ordersData,
        ordersPage
    };
}

export function loader({ request, params }) {
    try {
        return defer({
            data: loadMyOrders()
        })
    } catch (error) {
        return redirect("/?message=Access Denied!&type=danger");
    }
}