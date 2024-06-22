import Modal from "../Modal";
import styles from "../css/DeleteModal.module.css";
import { deleteCategory } from "../../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DeleteCategoryModal = forwardRef(function DeleteCategoryModal({ category, setCategory, categories }, ref) {
    const submit = useSubmit();

    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const result = await deleteCategory(category);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            if (result.ok == false) {
                submit(`message=Category '${category}' is Already Deleted, Try to Refresh!&type=danger`,
                    { action: "/categories", method: "get" });

                return;
            }

            setCategory("");

            return submit(`message=Successfully Deleted Category '${category}'!&type=success`,
                { action: "/categories", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
        setCategory("");
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete &apos;{category}&apos; Category?</h4>
                <div>All the Products and Promotions Within the &apos;{category}&apos; Category Will be Deleted.</div>
                <div className={`${styles["modal-buttons"]} d-flex flex-md-row flex-column`}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog" action="">
                        <button onClick={handleClose} className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default DeleteCategoryModal;