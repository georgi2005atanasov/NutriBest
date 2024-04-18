import { forwardRef } from "react";
import Modal from "./Modal";
import styles from "./css/Modal.module.css";

export default forwardRef(function DeleteProductModal({ productId }, ref) {
    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className="text-center">Are you sure you want to delete this product?</h4>
                <div className={styles["modal-buttons"]}>
                    <button className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});