import styles from "./css/GrantModal.module.css";
import Modal from "../Modal";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { allRoles } from "../../../../../../backend/api/auth";

// eslint-disable-next-line react/prop-types
const GrantModal = forwardRef(function GrantModal({ profile }, ref) {
    const [roles, setRoles] = useState();

    console.log(profile);

    function handleClose(event) {
        event.stopPropagation();
        ref.current.close();
    }

    console.log(roles);

    useEffect(() => {
        async function handleRoles() {
            const resultRoles = await allRoles();

            if (resultRoles.roles) {
                setRoles(resultRoles.roles);
            }
        }

        handleRoles();
    }, []);

    return <Modal ref={ref}>
        <div className={`d-flex justify-content-end align-items-center mb-0`}>
            <motion.i
                className={`mx-2 mt-2 fa fa-times d-flex justify-content-end ${styles["close-icon"]}`} aria-hidden="true"
                onClick={handleClose}
            >
            </motion.i>
        </div>
    </Modal>;
});

export default GrantModal;