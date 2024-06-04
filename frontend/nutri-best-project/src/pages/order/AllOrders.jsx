import styles from "../css/Table.module.css";
import searchBarStyles from "../../components/UI/Searchbar/css/SearchBar.module.css";
import { allOrders } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";
import Search from "../../components/UI/Searchbar/Search";

export default function AllOrders() {
    const { orders } = useLoaderData();

    console.log(orders);

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
                        <th>Is Finished</th>
                        <th>Is Confirmed</th>
                        <th>Made On</th>
                        <th>Is Shipped</th>
                        <th>Is Paid</th>
                        <th>Customer Name</th>
                        <th>Total Price</th>
                        <th>Is Anonymous</th>
                    </tr>
                </thead>
                <tbody className="">

                </tbody>
            </table>
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    const response = await allOrders();

    if (!response) {
        return redirect("/?message=Page Not Found!&type=danger");
    }

    if (!response.ok) {
        return {
            orders: []
        }
    }

    return {
        orders: await response.json()
    };
}