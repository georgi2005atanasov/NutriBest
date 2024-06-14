import styles from './css/LowStockNotification.module.css';
import { registerLowStockHandler, unregisterLowStockHandler } from '../../../../../backend/services/signalRService';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PRIORITIES = {
    "Low": "warning",
    "Medium": "danger",
    "High": "danger",
}

export const PRIORITIES_BACKGROUND = {
    "Low": "low-priority",
    "Medium": "medium-priority",
    "High": "high-priority",
}

function LowStockNotification() {
    const [notifications, setNotifications] = useState([]);

    const handleNotifyAdmin = (type, message, productId) => {
        setNotifications(prevNotifications => [...prevNotifications, 
            !prevNotifications.some(x => x.message == message) && 
            { type, message, productId }]);

        setTimeout(() => {
            setNotifications([]);
        }, 15000);
    };

    useEffect(() => {
        registerLowStockHandler(handleNotifyAdmin);

        return () => {
            unregisterLowStockHandler(handleNotifyAdmin);
            setNotifications([]);
        };
    }, []);

    return (
        <div className={`${styles["low-stock-container"]} ms-2 mt-3 position-fixed d-flex justify-content-center align-items-center`}>
            <AnimatePresence>
                {notifications.filter(x => x.message).map(({ type, message }) => (
                    <motion.div
                        key={message}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className={`${styles[PRIORITIES_BACKGROUND[type]]} text-${PRIORITIES[type]}`}
                    >
                        <strong>{message}</strong>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default LowStockNotification;