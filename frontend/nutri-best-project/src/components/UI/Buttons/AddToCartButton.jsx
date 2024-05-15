import styles from "./css/AddToCartButton.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AddToCartButton({ wrapperStyles = "", linkStyles = "", isValidPromotion }) {
    return <div className={`text-center ${wrapperStyles}`}>
        <Link className={`${linkStyles} ${isValidPromotion == true ? styles["promotion-btn"] : null} ${styles["add-to-cart-btn"]}`}>
            Add to Cart
        </Link>
    </div>;
}