/* eslint-disable react/prop-types */
import styles from "./css/CartModal.module.css";
import { addToCart, removeFromCart } from "../../../../../../backend/api/cart";
import { getCart } from "../../../../../../backend/api/cart";
import { getImageByProductId } from "../../../../../../backend/api/api";
import { CartContext } from "../../../store/CartContext";
import { useContext, useRef } from "react";

export default function CartItemCounter({ product, count }) {
    const countRef = useRef(count);
    const { setCart } = useContext(CartContext);

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

    async function handleAdd(event, productId) {
        await addToCart(productId, 1);
        countRef.current.value = Number(countRef.current.value) + 1;
    }

    async function handleRemove(event, productId) {
        await removeFromCart(productId, 1);
        countRef.current.value = Number(countRef.current.value) - 1;

        if (countRef.current.value == "0") {
            await getCartProducts();
        }
    }

    function handleBlur(event, productId) {
        event.stopPropagation();

    }

    async function handleEnter(event, productId) {
        event.stopPropagation();
        if (event.key == "Enter") {
            // countRef.current.value
            event.target.blur();
        }
    }

    return <div className="ms-md-3 d-md-flex align-items-center justify-content-center">
        <button
            onClick={(event) => handleRemove(event.target.value, product.productId)}
            id={styles["minus-btn"]}
            className="border-0 m-1">
            -
        </button>
        <input
            onKeyDown={(event) => handleEnter(event, product.productId)}
            onBlur={(event) => handleBlur(event, product.productId)}
            className={`${styles["add-counter"]} bg-light`}
            type="number" id="quantity" name="quantity" defaultValue={count}
            ref={countRef} />
        <button
            onClick={(event) => handleAdd(event, product.productId)}
            id={styles["plus-btn"]}
            className="border-0 m-1">
            +
        </button>
    </div>
}