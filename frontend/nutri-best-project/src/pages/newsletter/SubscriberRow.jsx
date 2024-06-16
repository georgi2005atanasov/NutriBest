/* eslint-disable react/prop-types */
import styles from "./css/SubscriberRow.module.css";
import { motion } from "framer-motion";

export default function SubscriberRow({ subscriber, handleDelete }) {
    return <tr className="position-relative">
        <td>{subscriber.email}</td>
        <td>
            {subscriber.isAnonymous ? "Yes" : "No"}
        </td>
        <td>
            {subscriber.totalOrders}
        </td>
        <td>{new Date(subscriber.registeredOn).toLocaleDateString()}</td>
        <td>
            {subscriber.name || <strong>-</strong>}
        </td>
        <td>
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end mt-2 me-1 ${styles["delete-icon"]}`} aria-hidden="true"
                onClick={() => handleDelete(subscriber.email)}
            >
            </motion.i>
        </td>
    </tr>
}