import { Link } from "react-router-dom";
import styles from "../css/AddToCartButton.module.css";

export default function AddToCartButton() {
    return <div className="text-center">
        {/* gotta do sth when the link is clicked */}
        <Link className={styles["add-to-cart-btn"]}>
            <i className={styles["fas fa-shopping-cart"]}></i> Add to Cart
        </Link>
    </div>;
}