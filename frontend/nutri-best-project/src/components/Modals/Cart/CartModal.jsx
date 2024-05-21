import styles from "./css/CartModal.module.css";
import Modal from "../Modal";
import { motion } from "framer-motion";
import { CartContext } from "../../../store/CartContext";
import { getPrice } from "../../../utils/product/products";
import { Link } from "react-router-dom";
import { forwardRef, useContext } from "react";
import { cleanCart } from "../../../../../../backend/api/cart";
import CartItemCounter from "./CartItemCounter";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({ }, ref) { //gonna accept sth in the future  
    const { cart, setCart } = useContext(CartContext);

    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    async function onClean() {
        await cleanCart();
        setCart();
    }

    return <Modal ref={ref}>
        <div className="d-flex justify-content-between align-items-center">
            <motion.i
                className={`mx-2 mt-2 fa fa-trash-o d-flex align-items-start justify-content-start ${styles["clean-cart-icon"]}`} aria-hidden="true"
                onClick={onClean}
            >
            </motion.i>
            <motion.i
                className={`mx-2 mt-2 fa fa-times d-flex justify-content-end ${styles["close-cart-icon"]}`} aria-hidden="true"
                onClick={handleClose}
            >
            </motion.i>
        </div>

        <div className={`${styles["cart-modal"]} d-flex flex-column justify-content-center align-items-evenly`}>
            {cart && cart.cartProducts.map(x => <div key={x.productId} className="d-flex justify-content-between">
                <Link onClick={handleClose} className={`${styles["product-cart-item"]}`} to={`/products/details/${x.product.productId}/${x.product.name}`}>
                    <div className="d-flex justify-content-start align-items-center m-1">
                        <img className={styles["cart-image"]} src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt="iii" />

                        <div className="ms-2 d-flex flex-column">
                            <h5 className={`mb-0 ${styles["product-name"]}`}>{x.product.name}</h5>
                            <div className="text-italic ms-2">
                                {x.product.promotionId ?
                                    getPrice(x.product.price, x.product.discountPercentage).toFixed(2) :
                                    x.product.price.toFixed(2)} BGN per package
                            </div>
                        </div>

                    </div>
                    <hr className={`${styles["product-cart-line"]} m-1`} />
                </Link>
                <CartItemCounter key={x.count} product={x.product} count={x.count} />
            </div>

            )}
            <hr className="m-1" />
            <div className="ms-2 d-flex align-items-end">
                <strong>Total: {cart && cart.totalPrice.toFixed(2)} BGN</strong>
            </div>
            <hr className="m-1" />
            <div className={styles["modal-buttons"]}>
                <form method="dialog" action="" className="border-0">
                    <button onClick={handleClose} className={`${styles["close-btn"]} border-0`}>Close</button>
                </form>
                <button className={`${styles["checkout-btn"]} border-0`}>Go To Checkout</button>
            </div>
        </div >
    </Modal>;
});

export default CartModal;