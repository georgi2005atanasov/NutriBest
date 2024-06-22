/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { Link } from "react-router-dom";
import { memo } from "react";

export default memo(function MyOrderRow({ order }) {
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