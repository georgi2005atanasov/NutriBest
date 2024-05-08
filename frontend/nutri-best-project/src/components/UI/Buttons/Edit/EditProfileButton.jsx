import styles from "../css/EditProfileButton.module.css";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function EditProfileButton({ onBlur, disabled, identifier }) {
    function handleEdit(event) {
        if (event.target.innerHTML == "Save") {
            onBlur(identifier);
        }
    }

    return <motion.div
        className="col-md-2 d-flex align-items-start justify-content-start"
    >
        <motion.button
            onClick={handleEdit}
            className={`${styles["edit-profile-btn"]} 
        ${disabled ? `${styles["disabled-color"]} d-none` : styles["active-color"]}`}
        >
            {disabled ? "Edit" : "Save"}
        </motion.button>
    </motion.div>
}