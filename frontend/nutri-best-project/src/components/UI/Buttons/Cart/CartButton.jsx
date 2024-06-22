import shoppingBag from "../../../../assets/shopping-bag.png";
import colors from "../../../../App.module.css";
import styles from "../../../Navigation/MainNavigation.module.css";

// eslint-disable-next-line react/prop-types
export default function CartButton({ openCart }) {
    return <div
        onClick={openCart}
        id={styles["shopping-cart-wrapper"]}
        className={`${colors["user-color"]} 
        ${styles["nav-link"]} px-2 p-lg-4 mx-1`}>
        <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
    </div>
}