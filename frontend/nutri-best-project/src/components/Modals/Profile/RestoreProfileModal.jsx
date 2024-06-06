/* eslint-disable react/prop-types */
import Modal from "../Modal";
import styles from "../css/BrandDetailsModal.module.css";
import { forwardRef } from "react";

const RestoreProfileModal = forwardRef(function RestoreProfileModal({ profileId }, ref) {
    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    console.log(profileId);

    function handleRestore() {

    }

    return <Modal ref={ref}>
        <div>
            <div className={`${styles["modal"]} flex-column`}>
                <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Restore This Profile?</h4>
                <div className={`${styles["modal-buttons"]} d-flex flex-md-row flex-column`}>
                    <button type="submit" onClick={handleRestore} className={styles["delete-btn"]}>Yes, Restore</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]} onClick={handleClose}>No, Close</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default RestoreProfileModal;