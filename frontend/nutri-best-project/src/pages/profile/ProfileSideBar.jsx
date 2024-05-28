import styles from "./css/ProfileSideBar.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from 'react';

const ProfileSideBar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={styles["sidebar-container"]}>
            <button className={styles["toggle-button"]} onClick={toggleSidebar}>
                <strong>≡</strong>
            </button>
            {isSidebarVisible && (
                <motion.div
                    initial={{ opacity: 0 }} // Start with the component invisible
                    animate={{ opacity: 1 }} // Animate to fully visible
                    transition={{ duration: 0.5 }}
                >
                    <div className={`d-flex flex-column ${styles["sidebar"]}`}>
                        <Link className="d-flex justify-content-center align-items-center" to="/profile">Profile</Link>
                        <Link className="d-flex justify-content-center align-items-center" to="/profile/address">Address</Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ProfileSideBar;