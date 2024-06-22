import styles from "./css/CategoriesList.module.css";
import NavigationLink from "../Navigation/NavigationLink";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CategoryNavItem({ isAdmin, category }) {
    const navigate = useNavigate();

    function setFilter(value) {
        sessionStorage.setItem("categories", value);
    }

    function handleNavigate() {
        sessionStorage.setItem("categories", category);
        return navigate(`/products/all?page=1&categories=${category}`);
    }

    return <div onClick={handleNavigate} className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
        <NavigationLink
            route={`/products/all?page=1&categories=${category}`}
            text={`${category}`}
            isAdmin={isAdmin}
            onClick={() => setFilter(`${category}`)} />
    </div>
}