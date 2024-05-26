import styles from "./MainNavigation.module.css";
import colors from "../../App.module.css";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NavigationLink({ route, text, isAdmin, ...props }) {
    const navigate = useNavigate();
    const allStyles = `${isAdmin ? colors["admin-color"] : colors["user-color"]}`;

    function handleRedirect() {
        return navigate(route);
    }

    return <div onClick={handleRedirect} className={`${allStyles} ${styles["nav-link"]}`}>
        <Link {...props} to={route}>{text}</Link>
    </div>;
}