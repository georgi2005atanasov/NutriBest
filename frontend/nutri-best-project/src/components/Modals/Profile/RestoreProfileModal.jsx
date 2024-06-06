/* eslint-disable react/prop-types */
import Modal from "../Modal";
import styles from "./css/RestoreProfileModal.module.css";
import { restoreProfile } from "../../../../../../backend/api/admin";
import { forwardRef } from "react";
import { useSubmit } from "react-router-dom";

const RestoreProfileModal = forwardRef(function RestoreProfileModal({ profileId }, ref) {
    const submit = useSubmit();

    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    console.log(profileId);

    async function handleRestore() {
        const response = await restoreProfile(profileId);
        const data = await response.json();

        ref.current.close();
        if (!response.ok) {
            if (data.message) {
                return submit(`message=${data.message}&type=danger`, {
                    action: "/profiles",
                    method: "GET"
                })
            }
            return;
        }

        if (data.message) {
            return submit(`message=${data.message}&type=success`, {
                action: "/profiles",
                method: "GET"
            })
        }
    }

    return <Modal ref={ref}>
        <div>
            <div className={`${styles["modal"]} flex-column mt-4`}>
                <h3>Are You Sure You Want to Restore This Profile?</h3>
                <div className={`${styles["modal-buttons"]} d-flex flex-md-row flex-column`}>
                    <button type="submit" onClick={handleRestore} className={styles["restore-btn"]}>Yes, Restore</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]} onClick={handleClose}>No, Close</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default RestoreProfileModal;