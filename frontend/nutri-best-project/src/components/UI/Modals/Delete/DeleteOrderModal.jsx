import Modal from "../Modal";
import styles from "../css/DeleteModal.module.css";
import { deleteOrder } from "../../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DeleteOrderModal = forwardRef(function DeleteOrderModal({ orderId }, ref) {
    const submit = useSubmit();

    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const response = await deleteOrder(orderId);

            if (!response.ok) {
                const data = await response.json();

                if (data.message) {
                    ref.current.close();
                    return submit(`message=${data.message}!&type=danger`,
                        { action: "/orders", method: "get" });
                } else {
                    ref.current.close();
                    return submit(`message=Could not delete order with Id '${orderId}'!&type=danger`,
                        { action: "/orders", method: "get" });
                }
            }

            window.scrollTo({
                top: 550,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();
            return submit(`message=Successfully Deleted Order with Id '${orderId}'!&type=success`,
                { action: "/orders", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
        // setCategory("");
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete order with Id &apos;{orderId}&apos;?</h4>
                <div>There will be no saving records.</div>
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

export default DeleteOrderModal;