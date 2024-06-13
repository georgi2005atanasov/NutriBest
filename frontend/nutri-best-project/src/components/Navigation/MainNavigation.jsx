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
import { Link } from "react-router-dom";

const MainNavigation = memo(function MainNavigation() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const { categories } = useContext(CategoryBrandContext);
    const [liveUsersCount, setLiveUsersCount] = useState(JSON.parse(localStorage.getItem("usersCount")));

    console.log(liveUsersCount);

    useEffect(() => {
        // const fetchUsersCount = () => {
        //     connection.invoke("GetUsersCount")
        //         .then(count => {
        //             setLiveUsersCount(count);
        //         })
        //         .catch(error => {
        //             console.error('Fetching users count failed:', error);
        //         });
        // };

        const updateNotification = (routesWithCount) => {
            if (routesWithCount) {
                setLiveUsersCount(routesWithCount);
                localStorage.setItem("usersCount",
                    JSON.stringify(routesWithCount));
            }
            else {
                setLiveUsersCount(localStorage.getItem("usersCount"));
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
            <h5 className="text-center mt-3">
                &#x1F7E2;
                <Link to="/live" className="text-success">
                    Live:&nbsp;{liveUsersCount &&
                        JSON.stringify(liveUsersCount
                            .map(x => x.count)
                            .reduce((acc, x) => acc += x, 0))}
                </Link>
            </h5>}
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

