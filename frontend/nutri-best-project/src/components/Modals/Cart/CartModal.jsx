import styles from "./css/CartModal.module.css";
import Modal from "../Modal";
import { CartContext } from "../../../store/CartContext";
import { getPrice } from "../../../utils/product/products";
import { forwardRef, useContext } from "react";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({ }, ref) { //gonna accept sth in the future    
    function handleClose(event) {
        event.stopPropagation();
    }

    const { cart } = useContext(CartContext);
    console.log(cart);

    return <Modal ref={ref}>
        <div className={`${styles["cart-modal"]} d-flex flex-column justify-content-center align-items-evenly`}>
            {cart && cart.cartProducts.map(x =>
                <div key={x.productId} className="d-flex justify-content-start align-items-center m-1">
                    <img src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt="iii" />

                    <div className="ms-2 d-flex flex-column">
                        <h5 className="mb-0">{x.product.name}</h5>
                        <div className="text-italic ms-2">{x.count} x&nbsp;
                            {x.product.promotionId ?
                                getPrice(x.product.price, x.product.discountPercentage).toFixed(2) :
                                x.product.price.toFixed(2)} BGN
                        </div>
                    </div>

                </div>
            )}
            <div className={styles["modal-buttons"]}>
                <form method="dialog" action="">
                    <button onClick={handleClose} className={`${styles["close-btn"]} border-0`}>Close</button>
                </form>
                <button className={`${styles["checkout-btn"]} border-0`}>Go To Checkout</button>
            </div>
        </div>
    </Modal>;
});

export default CartModal;