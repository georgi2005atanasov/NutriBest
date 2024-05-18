import Modal from "../Modal";
import styles from "../css/DeleteProductModal.module.css";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";
import { deleteBrandByName } from "../../../../../../backend/api/brands";

// eslint-disable-next-line react/prop-types
const DeleteBrandModal = forwardRef(function DeleteBrandModal({ brand, setBrand, setModal }, ref) {
    const submit = useSubmit();
    
    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const result = await deleteBrandByName(brand);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            if (result.ok == false) {
                submit(`message=Brand '${brand}' is Already Deleted, Try to Refresh!&type=danger`,
                    { action: "/brands", method: "GET" });

                return;
            }

            return submit(`message=Successfully Deleted Brand '${brand}'!&type=success`,
                { action: "/brands", method: "GET" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
        setBrand("");
        setModal("");
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete &apos;{brand}&apos; Brand?</h4>
                <div>All the Products and Promotions Within the &apos;{brand}&apos; Brand Will be Deleted.</div>
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

export default DeleteBrandModal;