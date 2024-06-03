/* eslint-disable react/prop-types */
import { addToCart, removeFromCart } from "../../../../../../backend/api/cart";
import { getCart } from "../../../../../../backend/api/cart";
import { getImageByProductId, setProductInCart } from "../../../../../../backend/api/api";
import { CartContext } from "../../../store/CartContext";
import { useContext, useRef, useState } from "react";

export default function CartItemCounter({ styles, product, count, flavour, grams }) {
    const [error, setError] = useState("");
    const countRef = useRef(count);
    const { setCart } = useContext(CartContext);

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

    async function handleAdd(event) {
        const response = await addToCart(product.productId,
            1,
            flavour,
            grams);
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }

        countRef.current.value = Number(countRef.current.value) + 1;
        await getCartProducts();
    }

    async function handleRemove(event) {
        const response = await removeFromCart(product.productId,
            1,
            flavour,
            grams);
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }

        countRef.current.value = Number(countRef.current.value) - 1;
        await getCartProducts();
    }

    async function handleEnteredValue() {
        if (Number(countRef.current.value) < 0) {
            setError("Invalid product count!");
            return;
        }
        const response = await setProductInCart(product.productId,
            Number(countRef.current.value),
            flavour,
            grams);
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }
        await getCartProducts();
    }

    async function handleEnter(event) {
        event.stopPropagation();
        if (event.key == "Enter") {
            handleEnteredValue(product.productId);
            event.target.blur();
        }
    }

    return <>
        <div className="ms-md-3 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center">
                    <button
                        onClick={(event) => handleRemove(event.target.value)}
                        id={styles["minus-btn"]}
                        className="border-0 m-1">
                        -
                    </button>
                    <input
                        onKeyDown={(event) => handleEnter(event)}
                        className={`${styles["add-counter"]} bg-light`}
                        type="number" id="quantity" name="quantity" defaultValue={count}
                        ref={countRef} />
                    <button
                        onClick={(event) => handleAdd(event)}
                        id={styles["plus-btn"]}
                        className="border-0 m-1">
                        +
                    </button>
                </div>
                {error && <span className="d-flex text-danger">{error}</span>}
            </div>
        </div>
    </>
}