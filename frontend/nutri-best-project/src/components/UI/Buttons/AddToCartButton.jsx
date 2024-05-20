import styles from "./css/AddToCartButton.module.css";
import CartModal from "../../Modals/Cart/CartModal";
import { addToCart } from "../../../../../../backend/api/cart";
import { useContext, useRef, useState } from "react";
import InputError from "../Form/InputError";
import { CartContext } from "../../../store/CartContext";

// eslint-disable-next-line react/prop-types
export default function AddToCartButton({ productId, wrapperStyles = "", linkStyles = "", isValidPromotion }) {
    const dialog = useRef();
    const { setCurrentProducts } = useContext(CartContext);
    const [error, setError] = useState();

    async function handleCartAdd() {
        const response = await addToCart(productId, 1);

        if (!response.ok) {
            const result = await response.json();
            setError(result.message);
            return;
        }

        if (error) {
            setError("");
        }

        fetch(setCurrentProducts())
        .then(() => dialog.current.open());

    }

    return <>
        <CartModal ref={dialog} />

        <div className={`text-center ${wrapperStyles}`}>
            <button
                onClick={handleCartAdd}
                className={`${linkStyles} 
                ${isValidPromotion == true ? styles["promotion-btn"] : null}
                ${styles["add-to-cart-btn"]}`}>
                Add to Cart
            </button>
            {error && <InputError styles="text-danger" text={error} />}
        </div>
    </>;
}