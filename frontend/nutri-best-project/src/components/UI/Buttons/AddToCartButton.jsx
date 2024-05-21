import styles from "./css/AddToCartButton.module.css";
import CartModal from "../../Modals/Cart/CartModal";
import { addToCart, getCart } from "../../../../../../backend/api/cart";
import { getImageByProductId } from "../../../../../../backend/api/api";
import { useContext, useRef, useState } from "react";
import InputError from "../Form/InputError";
import { CartContext } from "../../../store/CartContext";

// eslint-disable-next-line react/prop-types
export default function AddToCartButton({ productId, wrapperStyles = "", linkStyles = "", isValidPromotion }) {
    const dialog = useRef();
    const { setCart } = useContext(CartContext);
    const [error, setError] = useState();

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

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
        await getCartProducts()
        dialog.current.open();
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