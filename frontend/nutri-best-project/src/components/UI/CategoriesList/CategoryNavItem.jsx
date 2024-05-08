import styles from "./css/CategoriesList.module.css";
import NavigationLink from "../../Navigation/NavigationLink";

// eslint-disable-next-line react/prop-types
export default function CategoryNavItem({ isAdmin, category }) {
    function setFilter(value) {
        sessionStorage.setItem("categories", value);
    }

    return <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
        <NavigationLink
            route={`/products/all?page=1&categories=${category}`}
            text={`${category}`}
            isAdmin={isAdmin}
            onClick={() => setFilter(`${category}`)} />
    </div>
}