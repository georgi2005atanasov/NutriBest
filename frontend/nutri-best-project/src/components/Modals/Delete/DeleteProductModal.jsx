import Modal from "../Modal";
import styles from "../css/DeleteProductModal.module.css";
import { deleteProduct } from "../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeleteProductModal({ productId }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            await deleteProduct(productId);

            window.scrollTo({
                top: 0,
                left: 0, 
                behavior: 'smooth'
            });

            ref.current.close();

            return submit("message=Successfully deleted the product!&type=success",
                { action: "", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete This Product?</h4>
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