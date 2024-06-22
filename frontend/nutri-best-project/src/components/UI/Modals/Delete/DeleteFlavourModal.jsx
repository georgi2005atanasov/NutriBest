import Modal from "../Modal";
import styles from "../css/DeleteModal.module.css";
import { deleteFlavour } from "../../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DeleteFlavourModal = forwardRef(function DeleteFlavourModal({ flavour, setFlavour, flavours }, ref) {
    const submit = useSubmit();

    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const result = await deleteFlavour(flavour);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            if (result.ok == false) {
                submit(`message=Flavour '${flavour}' is Already Deleted, Try to Refresh!&type=danger`,
                    { action: "/flavours", method: "get" });

                return;
            }

            setFlavour("");

            return submit(`message=Successfully Deleted Flavour '${flavour}'!&type=success`,
                { action: "/flavours", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
        setFlavour("");
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete Flavour &apos;{flavour}&apos;?</h4>
                <div className="text-center">All the Products With Flavour &apos;{flavour}&apos; Will be Deleted.</div>
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

export default DeleteFlavourModal;