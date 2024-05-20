import styles from "./css/CartModal.module.css";

export default function CartItemCounter({ product }) {
    async function handleAdd(event, productId) {

    }

    async function handleRemove(event, productId) {

    }

    function handleBlur(event, productId) {
        event.stopPropagation();
    }

    function handleEnter(event, productId) {
        event.stopPropagation();
        if (event.key == "Enter") {
            console.log(event.target.value);
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
            type="text" id="quantity" name="quantity" defaultValue={product.quantity} />
        <button
            onClick={(event) => handleAdd(event, product.productId)}
            id={styles["plus-btn"]}
            className="border-0 m-1">
            +
        </button>
    </div>
}