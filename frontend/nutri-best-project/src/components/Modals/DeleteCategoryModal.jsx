import { forwardRef } from "react";
import Modal from "./Modal";
import styles from "./css/DeleteProductModal.module.css";
import { redirect, useSubmit } from "react-router-dom";
import { deleteCategory } from "../../../../../backend/api/api";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeleteCategoryModal({ category }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            await deleteCategory(category);

            window.scrollTo({
                top: 0,
                left: 0, 
                behavior: 'smooth'
            });

            ref.current.close();

            return submit("message=Successfully deleted the category!&type=success",
                { action: "", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are you sure you want to delete this category?</h4>
                <div>All the products and promotions within the &apos;{category}&apos; category will be deleted.</div>
                <div className={styles["modal-buttons"]}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog" action="">
                        <button onClick={handleClose} className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});