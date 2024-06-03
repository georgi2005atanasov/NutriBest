import styles from "./css/CartModal.module.css";
import Modal from "../Modal";
import CartItemCounter from "./CartItemCounter";
import { CartContext } from "../../../store/CartContext";
import { getPrice } from "../../../utils/product/products";
import { cleanCart } from "../../../../../../backend/api/cart";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { forwardRef, useContext, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({ }, ref) { //gonna accept sth in the future  
    const { cart, setCart } = useContext(CartContext);
    console.log(cart);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localStorage.getItem("cartMessage")) {
                localStorage.removeItem("cartMessage")
            }
        }, 100);

        return () => {
            clearTimeout(timeout);
        }
    }, []);

function handleClose(event) {
    event.stopPropagation();
    ref.current.close();
}

async function onClean() {
    await cleanCart();
    setCart();
}

function goToCheckout() {
    navigate("/cart");
    ref.current.close();
}

return <Modal ref={ref}>
    <div className={`d-flex justify-content-end align-items-center mb-0`}>
        {/* <motion.i
                className={`mx-2 mt-2 fa fa-times d-flex justify-content-end ${styles["close-cart-icon"]}`} aria-hidden="true"
                onClick={handleClose}
            >
            </motion.i> */}
    </div>

    <div
        className={`${styles["cart-modal"]} d-flex flex-column justify-content-center align-items-evenly`}
    >
        <div className={styles["modal-buttons"]}>
            <button onClick={handleClose} className={`${styles["close-btn"]} border-0 w-100`}>Close</button>
            <button onClick={goToCheckout} className={`${styles["checkout-btn"]} border-0 w-100`}>Go To Checkout</button>
        </div>
        <span className={styles["success-message"]}>{localStorage.getItem("cartMessage") && localStorage.getItem("cartMessage")}</span>
        <hr className="m-1" />
        <div className="ms-2 d-flex align-items-end">
            <strong>Total: {cart && cart.totalPrice.toFixed(2)} BGN</strong>
            <motion.i
                className={`mx-2 mt-2 fa fa-trash-o d-flex align-items-start justify-content-start ${styles["clean-cart-icon"]}`} aria-hidden="true"
                onClick={onClean}
            >
            </motion.i>
        </div>
        <hr className="m-1" />
        {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(x => <div key={`${x.productId}-${x.flavour}-${x.grams}`} className="d-flex flex-md-row flex-column justify-content-between">
            <Link onClick={handleClose} className={`${styles["product-cart-item"]}`} to={`/products/details/${x.product.productId}/${x.product.name}`}>
                <div className="d-flex justify-content-start align-items-center m-1">
                    <img className={styles["cart-image"]} src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt={x.product.name} />

                    <div className="ms-2 d-flex flex-column">
                        <h5 className={`mb-0 ${styles["product-name"]}`}>{x.product.name}</h5>
                        <div className="text-italic ms-2">
                            {x.product.promotionId ?
                                getPrice(x.price, x.product.discountPercentage).toFixed(2) :
                                x.price.toFixed(2)} BGN per package
                        </div>
                    </div>
                </div>
                <hr className={`${styles["product-cart-line"]} m-1`} />
            </Link>
            <CartItemCounter
                key={x.count}
                styles={styles}
                product={x.product}
                count={x.count}
                flavour={x.flavour}
                grams={x.grams} />
        </div>
        )}
    </div>
</Modal>;
});

export default CartModal;