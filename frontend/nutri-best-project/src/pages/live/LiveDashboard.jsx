import styles from "./css/LiveDashboard.module.css";
import LiveUsers from "./LiveUsers";
import { getAuthToken } from "../../utils/auth";
import { connection } from "../../../../../backend/services/signalRService";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LiveDashboard() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
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

    if (!isAdmin && !isEmployee) {
        return;
    }

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