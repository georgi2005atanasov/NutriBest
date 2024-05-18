import Modal from "../Modal";
import styles from "../css/DeleteProductModal.module.css";
import { deleteUser } from "../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeleteProductModal({ productId }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            await deleteUser(productId);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            localStorage.setItem("successMessage", "Successfully deleted your profile!&type=success");

            return submit("message=Successfully deleted your profile!&type=success",
                { action: "/logout", method: "post" });
        } catch (error) {
            return redirect("/error");
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div className="text-center">
                    <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete Your Profile?</h4>
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