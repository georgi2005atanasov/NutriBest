/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { Link } from "react-router-dom";
import { getDate } from "../../utils/utils";

export default function OrderRow({ order }) {
    return <tr>
        <td>{order.orderId}</td>
        <td className={order.isFinished ? "text-success" : "text-danger"}>
            <Link className={order.isFinished ? "text-success" : "text-danger"}>
                {order.isFinished ? "Yes" : "No"}
            </Link>
        </td>
        <td className={order.isConfirmed ? "text-success" : "text-danger"}>
            {order.isConfirmed ? "Yes" : "No"}
        </td>
        <td>{getDate(order.madeOn)}</td>
        <td>
            <Link className={order.isShipped ? "text-success" : "text-danger"}>
                {order.isShipped ? "Yes" : "No"}
            </Link>
        </td>
        <td>
            <Link className={order.isPaid ? "text-success" : "text-danger"}>
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
}