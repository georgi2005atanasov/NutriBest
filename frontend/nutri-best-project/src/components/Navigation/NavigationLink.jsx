import { Link } from "react-router-dom";
import styles from "./MainNavigation.module.css";

// eslint-disable-next-line react/prop-types
export default function NavigationLink({ route, text, ...props }) {
    return <div className={`${styles["nav-link"]}`}>
        <Link {...props} to={route}>{text}</Link>
    </div>;
}