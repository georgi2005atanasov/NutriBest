/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { changeOrderStatuses } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { Link, useSubmit } from "react-router-dom";
import { memo } from "react";

export default memo(function MyOrderRow({ order, handleDelete }) {
    const submit = useSubmit();

    function changeStatus(identifier) {
        async function handleStatuses(identifier) {
            if (identifier == "isShipped") {
                await changeOrderStatuses(order.orderId,
                    order.isFinished,
                    order.isPaid,
                    !order.isShipped
                );
            }
            else if (identifier == "isFinished") {
                await changeOrderStatuses(order.orderId,
                    !order.isFinished,
                    order.isPaid,
                    order.isShipped
                );
            }
            else if (identifier == "isPaid") {
                await changeOrderStatuses(order.orderId,
                    order.isFinished,
                    !order.isPaid,
                    order.isShipped
                );
            }
        }

        handleStatuses(identifier);
        submit(null, { action: "", method: "GET" });
    }

    return <tr>
        <td>#000000{order.orderId}</td>
        <td className={order.isFinished ? "text-success" : "text-danger"}>
            {order.isFinished ? "Yes" : "No"}
        </td>
        <td className={order.isConfirmed ? "text-success" : "text-danger"}>
            {order.isConfirmed ? "Yes" : "No"}
        </td>
        <td>{new Date(order.madeOn).toLocaleDateString()}</td>
        <td>
            {order.isShipped ? "Yes" : "No"}
        </td>
        <td>
            {order.isPaid ? "Yes" : "No"}
        </td>
        <td>{order.totalPrice.toFixed(2)} BGN</td>
        <td className="d-flex align-items-center p-3">
            <Link to={`/order/finished?orderId=${order.orderId}`} className={`${styles["btn"]} ${styles["details"]} text-center me-1`}>Details</Link>
        </td>
    </tr>
})