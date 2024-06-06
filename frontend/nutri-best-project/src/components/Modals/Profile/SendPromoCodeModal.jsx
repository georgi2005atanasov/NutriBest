/* eslint-disable react/prop-types */
import Modal from "../Modal";
import styles from "../css/BrandDetailsModal.module.css";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const SendPromoCodeModal = forwardRef(function SendPromoCodeModal({ profileId }, ref) {
    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    function handleSend() {

    }

    return <Modal ref={ref}>
        <div>
            <div className={styles["modal-content"]}>
                <h4 className={`text ${styles["delete-modal"]}`}>Choose Promo Code:</h4>
            </div>
        </div>
    </Modal>;
});

export default SendPromoCodeModal;