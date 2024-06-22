/* eslint-disable react/prop-types */
import rowStyles from "./css/NotificationRow.module.css";
import styles from "../../components/Notifications/css/LowStockNotification.module.css";
import { PRIORITIES, PRIORITIES_BACKGROUND } from "../../components/Notifications/LowStockNotification";
import { deleteNotification } from "../../../../../backend/api/notifcations";
import { motion } from "framer-motion"
import { useSubmit } from "react-router-dom";
import { useState } from "react";

export default function NotificationRow({ notification }) {
    const [error, setError] = useState(); 
    const submit = useSubmit();

    async function onDelete() {
        try {
            await deleteNotification(notification.message);

            if (error) {
                setError();
            }

            submit(null, {action: "/notifications", method: "GET"});
        } catch (error) {
            setError("Could not Delete This Notification!");
        }

    }

    return <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`${rowStyles["notification"]} 
        ${styles[PRIORITIES_BACKGROUND[notification.priority]]} 
        text-${PRIORITIES[notification.priority]} m-3 position-relative`}
    >
        <div className={rowStyles["title"]}>
            <strong>{notification.title}</strong>
        </div>
        <div className={rowStyles["message"]}>
            {notification.message}
        </div>
        <div className={rowStyles["sent-at"]}>
            Sent on: {new Date(notification.sentAt).toLocaleDateString()} {new Date(notification.sentAt).toLocaleTimeString()}
        </div>
        <a href={`/products/edit/${notification.productId}`} className={rowStyles["product-link"]}>
            Edit Product
        </a>
        {error && <span>{error}</span>}
        <motion.i
            className={`fa fa-trash-o d-flex justify-content-end ${rowStyles["delete-icon"]}`} aria-hidden="true"
            onClick={() => onDelete()}
        >
        </motion.i>
    </motion.div>
}