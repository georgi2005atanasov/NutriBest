import styles from "./css/LiveDashboard.module.css";
import { connection } from "../../../../../backend/services/signalRService";
import LiveUsers from "./LiveUsers";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LiveDashboard() {
    const [liveUsers, setLiveUsers] = useState(JSON.parse(localStorage.getItem("usersCount")));
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        const updateNotification = (routesWithCount) => {
            if (routesWithCount) {
                setLiveUsers(routesWithCount);
                localStorage.setItem("usersCount",
                    JSON.stringify(routesWithCount));
            }
            else {
                setLiveUsers(localStorage.getItem("usersCount"));
            }
        };

        connection.on("GetUsersCount", updateNotification);

        return () => {
            connection.off("GetUsersCount", updateNotification);
        };
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <button onClick={toggleVisibility} className={styles["live-users-button"]}>
                See Users &#x1F7E2;Live on Different Routes
            </button>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.5 }}
                        className="users-container"
                    >
                        <LiveUsers liveUsers={liveUsers} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}