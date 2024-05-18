import Modal from "../Modal";
import styles from "../css/DeleteProductModal.module.css";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const CartModal = forwardRef(function CartModal({}, ref) { //gonna accept sth in the future
    function handleClose(event) {
        event.stopPropagation();
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div>this is cart modal</div>
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