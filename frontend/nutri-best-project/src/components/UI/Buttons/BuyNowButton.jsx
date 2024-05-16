import styles from "./css/AddToCartButton.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function BuyNowButton({ wrapperStyles = "", linkStyles = "" }) {
    return <div className={`text-center ${wrapperStyles}`}>
        <Link className={`${linkStyles} ${styles["promotion-btn"]} ${styles["add-to-cart-btn"]}`}>
            &nbsp;Buy Now&nbsp;
        </Link>
    </div>;
}