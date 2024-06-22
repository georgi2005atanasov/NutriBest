/* eslint-disable react/prop-types */
import Modal from "../Modal";
import styles from "./BrandDetailsModal.module.css";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const BrandDetailsModal = forwardRef(function BrandDetailsModal({ image, brand, setBrand, setModal }, ref) {
    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
        setBrand("");
        setModal("");
    }

    return <Modal ref={ref}>
        <div>
            <div className={styles["modal-content"]}>
                <div className="d-flex justify-content-center">
                    {<img className={styles["image-style"]} src={image} alt="Dynamic" />}
                </div>
                <div className="d-flex justify-content-center my-2">{brand.description}</div>
                <div className={styles["modal-buttons"]}>
                    <form method="dialog" action="">
                        <button onClick={handleClose} className={styles["close-btn"]}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});

export default BrandDetailsModal;