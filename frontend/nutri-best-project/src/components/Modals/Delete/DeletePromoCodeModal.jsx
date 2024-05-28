import Modal from "../Modal";
import styles from "../css/DeletePromotionModal.module.css";
import { deletePromoCodes } from "../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeletePromoCodeModal({ description }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            let data = new FormData();
            data.set("description", description);
            const response = await deletePromoCodes(data);

            if (!response.ok) {
                return;
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            return submit("message=Successfully Deleted the Promo Codes!&type=success",
                { action: "", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div className="text-center">
                    <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete These Promo Codes?</h4>
                </div>
                <div className={`${styles["modal-buttons"]} d-flex flex-md-row flex-column`}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});