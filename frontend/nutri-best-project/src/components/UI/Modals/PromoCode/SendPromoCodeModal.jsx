/* eslint-disable react/prop-types */
import { allPromoCodes } from "../../../../../../../backend/api/api";
import Modal from "../Modal";
import PromoCodeSelector from "../Profile/PromoCodeSelector";
import styles from "./css/SendPromoCodeModal.module.css";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const SendPromoCodeModal = forwardRef(function SendPromoCodeModal({ email }, ref) {
    const [promoCodes, setPromoCodes] = useState();

    useEffect(() => {
        async function handlePromoCodes() {
            const response = await allPromoCodes();

            if (!response.ok) { // maybe some message
                return;
            }

            const promoCodesResult = await response.json();

            setPromoCodes(promoCodesResult);
        }

        handlePromoCodes();
    }, []);

    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    return <>
        <Modal ref={ref}>
            <div className={`w-100 position-relative`}>
                <motion.i
                    className={`mx-2 mt-2 fa fa-times d-flex justify-content-end ${styles["close-modal-icon"]}`} aria-hidden="true"
                    onClick={handleClose}
                >
                </motion.i>
            </div>
            <PromoCodeSelector promoCodes={promoCodes} email={email} />
        </Modal>
    </>;
});

export default SendPromoCodeModal;