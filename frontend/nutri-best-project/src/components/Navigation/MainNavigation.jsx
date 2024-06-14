import styles from "./MainNavigation.module.css";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import NavToggler from "./NavToggler";
import NavSearchBar from "../UI/Searchbar/NavSearchBar";
import ScrollingText from "./ScrollingText";
import { CategoryBrandContext } from "../../store/CategoryBrandContext";
import { motion } from "framer-motion";
import { memo, useContext, useEffect, useState } from "react";
import { connection } from "../../../../../backend/services/signalRService";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import LiveUsersCount from "./LiveUsersCount";

const MainNavigation = memo(function MainNavigation() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { categories } = useContext(CategoryBrandContext);
    const [liveUsers, setLiveUsers] = useState();

    useEffect(() => {
        const updateNotification = (routesWithCount) => {
            if (routesWithCount) {
                setLiveUsers(routesWithCount);
            }
        };

        connection.on("GetUsersCount", updateNotification);

        return () => {
            connection.off("GetUsersCount", updateNotification);
        };
    }, []);

    return <>
        <ScrollingText />
        {(isAdmin || isEmployee) &&
            <LiveUsersCount liveUsers={liveUsers} />}
        <motion.div
            id="main-navigation"
            className={`container-fluid me-5 ${styles["main-navigation"]}`}
        >
            <div
                className="row d-flex justify-content-between align-items-center"
            >
                <NavLogo />
                <NavSearchBar categories={categories} />
                <NavToggler />
                <NavButtons />
            </div>
        </motion.div>
    </>
});

export default MainNavigation;

