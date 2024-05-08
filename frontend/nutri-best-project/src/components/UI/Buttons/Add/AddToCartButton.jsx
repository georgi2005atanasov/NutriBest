import styles from "../css/AddToCartButton.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AddToCartButton({ isValidPromotion }) {
    return <div className="text-center">
        <Link className={`${isValidPromotion == true ? styles["promotion-btn"] : null} ${styles["add-to-cart-btn"]}`}>
            <i className={styles["fas fa-shopping-cart"]}></i> Add to Cart
        </Link>
    </div>;
}