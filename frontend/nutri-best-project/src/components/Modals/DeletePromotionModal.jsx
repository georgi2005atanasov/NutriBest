import { forwardRef } from "react";
import Modal from "./Modal";
import styles from "./css/DeleteProductModal.module.css";
import { redirect, useSubmit } from "react-router-dom";
import { deletePromotion } from "../../../../../backend/api/api";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeletePromotionModal({ promotionId }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            await deletePromotion(promotionId);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            return submit("message=Successfully deleted promotion!&type=success",
                { action: "", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div className="text-center">
                    <h4 className={`text ${styles["delete-modal"]}`}>Are you sure you want to delete this promotion?</h4>
                </div>
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