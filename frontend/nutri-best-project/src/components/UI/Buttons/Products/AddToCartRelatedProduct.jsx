/* eslint-disable react/prop-types */
import styles from "./css/AddToCartButton.module.css";
import { CartContext } from "../../../../store/CartContext";
import { getCart, getImageByProductId, addToCart } from "../../../../../../../backend/api/api";
import { useContext, useState } from "react";

export default function AddToCartRelatedProduct({ linkStyles, productId, grams, flavour, isValidPromotion }) {
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
        const response = await addToCart(productId, 1, flavour, grams);

        if (!response.ok) {
            const result = await response.json();
            setError(result.message);
            return;
        }

        if (error) {
            setError("");
        }

        await getCartProducts();
    }

    return <>
        <div className="d-flex flex-column">
            <button
                onClick={handleCartAdd}
                className={`${linkStyles} ${isValidPromotion == true ? styles["promotion-btn"] : null}
                ${styles["add-to-cart-btn"]}`}>
                Add to Cart
            </button>
            {error && <span className="text-danger">{error}</span>}
        </div>
    </>
}