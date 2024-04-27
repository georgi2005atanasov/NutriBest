import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import colors from "../../App.module.css";

// eslint-disable-next-line react/prop-types
export default function NavigationLink({ route, text, isAdmin, ...props }) {
    const allStyles = `${isAdmin ? colors["admin-color"] : colors["user-color"]}`;
    return <div className={`${allStyles} ${styles["nav-link"]}`}>
        <Link {...props} to={route}>{text}</Link>
    </div>;
}