import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import Loader from "../../components/UI/Shared/Loader";
import Message from "../../components/UI/Shared/Message";
import OrdersPagination from "../../components/UI/Pagination/OrdersPagination";
import { getUserOrders } from "../../../../../backend/api/orders";
import MyOrderRow from "./MyOrderRow";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSubmit, useNavigation, useSearchParams } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function MyOrders() {
    const searchText = useRef();
    const { data, ordersPage } = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();
    const isLoading = navigation.state == "loading";
    const [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

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
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-md-5 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <div className="mt-5 d-flex justify-content-start">
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
                        <th>Total Price</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data && data.orders.map(x => <MyOrderRow key={x.orderId} order={x} />)}
                </tbody>
            </table>
        </div>

        <h3 className="text-center mt-3">Total Orders: {data.totalOrders}</h3>

        <div className="mt-3">
            <OrdersPagination
                page={ordersPage}
                ordersCount={data.totalOrders} />
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    try {
        const ordersPage = Number(sessionStorage.getItem("orders-page"));
        const search = sessionStorage.getItem("search");

        const response = await getUserOrders(ordersPage, search);

        if (response && !response.ok) {
            return redirect("/?message=Access Denied!&type=danger");
        }

        const data = await response.json();

        return {
            data,
            ordersPage
        };
    } catch (error) {
        return redirect("/?message=Access Denied!&type=danger");
    }
}