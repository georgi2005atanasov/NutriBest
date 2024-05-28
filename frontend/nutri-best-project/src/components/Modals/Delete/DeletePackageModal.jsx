import Modal from "../Modal";
import styles from "../css/DeleteFlavourModal.module.css";
import { deletePackage } from "../../../../../../backend/api/api";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DeletePackageModal = forwardRef(function DeletePackageModal({ packageToDelete, setPackageToDelete }, ref) {
    const submit = useSubmit();

    async function handleDelete(event) {
        try {
            event.stopPropagation();

            const result = await deletePackage(packageToDelete);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            ref.current.close();

            if (result.ok == false) {
                submit(`message=Package of ${packageToDelete}g is Already Deleted, Try to Refresh!&type=danger`,
                    { action: "/packages", method: "get" });

                return;
            }

            setPackageToDelete("");

            return submit(`message=Successfully Deleted Package of ${packageToDelete}g!&type=success`,
                { action: "/packages", method: "get" });
        } catch (error) {
            return redirect("/error");
        }
    }

    function handleClose(event) {
        event.stopPropagation();
        setPackageToDelete("");
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete Flavour &apos;{packageToDelete}&apos;?</h4>
                <div className="text-center">All the Products With Packages {packageToDelete}g Will be Deleted.</div>
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

export default DeletePackageModal;