/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { getDate } from "../../utils/utils";
import { changeOrderStatuses } from "../../../../../backend/api/orders";
import { Link, useSubmit } from "react-router-dom";
import { memo } from "react";

export default memo(function OrderRow({ order }) {
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
        <td>{order.orderId}</td>
        <td className={order.isFinished ? "text-success" : "text-danger"}>
            <Link onClick={() => changeStatus("isFinished")} className={order.isFinished ? "text-success" : "text-danger"}>
                {order.isFinished ? "Yes" : "No"}
            </Link>
        </td>
        <td className={order.isConfirmed ? "text-success" : "text-danger"}>
            {order.isConfirmed ? "Yes" : "No"}
        </td>
        <td>{getDate(order.madeOn)}</td>
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
        <td>{order.totalPrice}</td>
        <td className={order.isAnonymous ? "text-success" : "text-danger"}>
            {order.isAnonymous ? "Yes" : "No"}
        </td>
        <td className="p-3">
            <Link to={`/order/finished?orderId=${order.orderId}`} className={`${styles["btn"]} ${styles["details"]} me-1`}>Details</Link>
        </td>
    </tr>
})