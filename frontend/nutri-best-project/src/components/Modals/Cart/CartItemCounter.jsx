/* eslint-disable react/prop-types */
import { addToCart, removeFromCart } from "../../../../../../backend/api/cart";
import { getCart } from "../../../../../../backend/api/cart";
import { getImageByProductId, setProductInCart } from "../../../../../../backend/api/api";
import { CartContext } from "../../../store/CartContext";
import { useContext, useRef, useState } from "react";

export default function CartItemCounter({ styles, product, count }) {
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

    async function handleAdd(event, productId) {
        const response = await addToCart(productId, 1);
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }

        countRef.current.value = Number(countRef.current.value) + 1;
        await getCartProducts();
    }

    async function handleRemove(event, productId) {
        const response = await removeFromCart(productId, 1);
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }

        countRef.current.value = Number(countRef.current.value) - 1;
        await getCartProducts();
    }

    async function handleEnteredValue(productId) {
        if (Number(countRef.current.value) < 0) {
            setError("Invalid product count!");
            return;
        }
        const response = await setProductInCart(productId, Number(countRef.current.value));
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            return;
        }
        await getCartProducts();
    }

    async function handleEnter(event, productId) {
        event.stopPropagation();
        if (event.key == "Enter") {
            handleEnteredValue(productId);
            event.target.blur();
        }
    }

    return <>
        <div className="ms-md-3 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-center">
                    <button
                        onClick={(event) => handleRemove(event.target.value, product.productId)}
                        id={styles["minus-btn"]}
                        className="border-0 m-1">
                        -
                    </button>
                    <input
                        onKeyDown={(event) => handleEnter(event, product.productId)}
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
                {error && <span className="d-flex text-danger">{error}</span>}
            </div>
        </div>
    </>
}