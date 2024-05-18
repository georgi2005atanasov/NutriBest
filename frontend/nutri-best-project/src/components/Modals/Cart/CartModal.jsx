import Modal from "../Modal";
import styles from "../css/DeleteProductModal.module.css";
import { getCart } from "../../../../../../backend/api/api";
import { forwardRef, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({ cart }, ref) { //gonna accept sth in the future
    function handleClose(event) {
        event.stopPropagation();
    }

    console.log(cart);

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div>{JSON.stringify(cart)}</div>
                <div className={styles["modal-buttons"]}>
                    <form method="dialog" action="">
                        <button onClick={handleClose} className={styles["close-btn"]}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default CartModal;