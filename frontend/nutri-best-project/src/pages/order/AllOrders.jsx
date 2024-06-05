import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import Search from "../../components/UI/Searchbar/Search";
import OrdersPagination from "../../components/UI/Pagination/OrdersPagination";
import OrderRow from "./OrderRow";
import { allOrders } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";

export default function AllOrders() {
    const { data, ordersPage } = useLoaderData();

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-5 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <div className="mt-5 d-flex justify-content-start">
            <h2 className="mx-0 d-flex justify-content-center align-items-center">Orders</h2>
            <Search
                isVerified={true}
                styles={searchBarStyles}
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
                        <th>Customer Name</th>
                        <th>Total Price</th>
                        <th>Is Anonymous</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data && data.orders && data.orders.map(x => <OrderRow key={x.orderId} order={x} />)}
                </tbody>
            </table>
        </div>

        <div className="d-flex justify-content-end">
            <div className="w-25 bg-light p-2 d-flex flex-column justify-content-start m-3 py-2">
                <h6>
                    Total Orders: <span className="font-weight-light">{data && data.totalOrders}</span>
                </h6>
                <h6>
                    Total Products: {data && data.totalProducts}
                </h6>
                <h6>
                    Total Price Without Discounts: {data && data.totalPriceWithoutDiscount.toFixed(2)} BGN
                </h6>
                <h6>
                    Total Discount: {data && data.totalDiscounts.toFixed(2)} BGN
                </h6>
                <h6>
                    Total Profit: {data && data.totalPrice.toFixed(2)} BGN
                </h6>
            </div>
        </div>

        <div className="mt-3">
            <OrdersPagination
                page={ordersPage}
                ordersCount={data.totalOrders} />
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    const ordersPage = Number(sessionStorage.getItem("orders-page"));
    const response = await allOrders(ordersPage);

    console.log(ordersPage);
    if (!response) {
        return redirect("/?message=Page Not Found!&type=danger");
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