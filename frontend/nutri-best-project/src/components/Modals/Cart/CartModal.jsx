import styles from "./css/CartModal.module.css";
import Modal from "../Modal";
import { motion } from "framer-motion";
import { CartContext } from "../../../store/CartContext";
import { getPrice } from "../../../utils/product/products";
import { Link } from "react-router-dom";
import { forwardRef, useContext } from "react";
import { cleanCart } from "../../../../../../backend/api/cart";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({ }, ref) { //gonna accept sth in the future    
    const { cart, setCart } = useContext(CartContext);
    console.log(cart);

    function handleClose(event) {
        event.stopPropagation();
    }

    function close() {
        ref.current.close();
    }

    async function onClean() {
        await cleanCart();
        setCart();
    }


    return <Modal ref={ref}>
        <div className={`${styles["cart-modal"]} d-flex flex-column justify-content-center align-items-evenly`}>
            <motion.i
                className={`fa fa-trash-o d-flex justify-content-end ${styles["clean-cart-icon"]}`} aria-hidden="true"
                onClick={onClean}
            >
            </motion.i>
            {cart && cart.cartProducts.map(x => <Link key={x.productId} onClick={close} className={`${styles["product-cart-item"]}`} to={`/products/details/${x.product.productId}/${x.product.name}`}>
                <div className="d-flex justify-content-start align-items-center m-1">
                    <img className={styles["cart-image"]} src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt="iii" />

                    <div className="ms-2 d-flex flex-column">
                        <h5 className="mb-0">{x.product.name}</h5>
                        <div className="text-italic ms-2">{x.count} x&nbsp;
                            {x.product.promotionId ?
                                getPrice(x.product.price, x.product.discountPercentage).toFixed(2) :
                                x.product.price.toFixed(2)} BGN
                        </div>
                    </div>
                </div>
                <hr className="m-1" />
            </Link>
            )}
            <div className="ms-2 d-flex align-items-end">
                <strong>Total: {cart && cart.totalPrice} BGN</strong>
            </div>
            <hr className="m-1" />
            <div className={styles["modal-buttons"]}>
                <form method="dialog" action="" className="border-0">
                    <button onClick={handleClose} className={`${styles["close-btn"]} border-0`}>Close</button>
                </form>
                <button className={`${styles["checkout-btn"]} border-0`}>Go To Checkout</button>
                <button className={`${styles["clean-cart-btn"]} border-0`}>Clean Cart</button>
            </div>
        </div >
    </Modal>;
});

export default CartModal;