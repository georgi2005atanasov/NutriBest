import { registerNotificationHandler } from '../../../../../backend/services/signalRService';
import styles from './css/Notification.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

function Notification() {
    const [notifications, setNotifications] = useState([]);

    const handleNotifyAdmin = (notificationType, message) => {
        setNotifications(prevNotifications => [...prevNotifications, 
            !prevNotifications.some(x => x.message == message) && 
            { type: notificationType, message }]);

        setTimeout(() => {
            setNotifications([]);
        }, 5000);
    };

    useEffect(() => {
        registerNotificationHandler(handleNotifyAdmin);
    }, []);

    return (
        <div className={`${styles["notification-container"]} ms-2 mt-3 position-fixed d-flex justify-content-center align-items-center`}>
            <AnimatePresence>
                {notifications.filter(x => x.message).map(({ id, message }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className={styles["notification"]}
                    >
                        <strong>{message}</strong>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default Notification;