import { forwardRef } from "react";
import Modal from "./Modal";
import styles from "./css/Modal.module.css";
import { useSubmit } from "react-router-dom";
import { deleteProduct } from "../../../../../backend/api/api";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeleteProductModal({ productId }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            const response = await deleteProduct(productId);
            console.log(response);

            localStorage.removeItem(`image-${productId}`);
            
            ref.current.close();
            return submit("message=Successfully deleted the product!&type=success",
                { action: "", method: "get" });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are you sure you want to delete this product?</h4>
                <div className={styles["modal-buttons"]}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});