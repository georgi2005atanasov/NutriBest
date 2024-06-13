/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { changeOrderStatuses } from "../../../../../backend/api/orders";
import { motion } from "framer-motion";
import { Link, useSubmit } from "react-router-dom";
import { memo } from "react";

export default memo(function OrderRow({ order, handleDelete }) {
    const submit = useSubmit();

    function changeStatus(identifier) {
        async function handleStatuses(identifier) {
            if (identifier == "isShipped") {
                await changeOrderStatuses(order.orderId,
                    order.isFinished,
                    order.isPaid,
                    !order.isShipped,
                    order.isConfirmed
                );
            }
            else if (identifier == "isFinished") {
                await changeOrderStatuses(order.orderId,
                    !order.isFinished,
                    order.isPaid,
                    order.isShipped,
                    order.isConfirmed
                );
            }
            else if (identifier == "isPaid") {
                await changeOrderStatuses(order.orderId,
                    order.isFinished,
                    !order.isPaid,
                    order.isShipped,
                    order.isConfirmed
                );
            }
            else if (identifier == "isConfirmed") {
                await changeOrderStatuses(order.orderId,
                    order.isFinished,
                    order.isPaid,
                    order.isShipped,
                    !order.isConfirmed
                );
            }
        }

        handleStatuses(identifier);
        submit(null, { action: "", method: "GET" });
    }

    return <tr>
        <td>{order.orderId}</td>
        <td className={order.isFinished ? "text-success" : "text-danger"}>
            <Link onClick={() => changeStatus("isFinished")} className={order.isFinished ? "text-success" : "text-danger"}>
                {order.isFinished ? "Yes" : "No"}
            </Link>
        </td>
        <td className={order.isConfirmed ? "text-success" : "text-danger"}>
            {!order.isConfirmed ? <Link onClick={() => changeStatus("isConfirmed")} className={order.isConfirmed ? "text-success" : "text-danger"}>
                {order.isConfirmed ? "Yes" : "No"}
            </Link> :
                "Yes"}
        </td>
        <td>{new Date(order.madeOn).toLocaleDateString()}</td>
        <td>
            <Link onClick={() => changeStatus("isShipped")} className={order.isShipped ? "text-success" : "text-danger"}>
                {order.isShipped ? "Yes" : "No"}
            </Link>
        </td>
        <td>
            <Link onClick={() => changeStatus("isPaid")} className={order.isPaid ? "text-success" : "text-danger"}>
                {order.isPaid ? "Yes" : "No"}
            </Link>
        </td>
        <td>{order.customerName}</td>
        <td>{order.totalPrice.toFixed(2)} BGN</td>
        <td className={order.isAnonymous ? "text-success" : "text-danger"}>
            {order.isAnonymous ? "Yes" : "No"}
        </td>
        <td className="d-flex justify-content-evenly align-items-center p-3">
            <Link to={`/order/finished?orderId=${order.orderId}`} className={`${styles["btn"]} ${styles["details"]} text-center me-1`}>Details</Link>
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={() => handleDelete(order.orderId)}
            >
            </motion.i>
        </td>
    </tr>
})