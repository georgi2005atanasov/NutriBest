import styles from "./css/DeleteProfileButton.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import DeleteProfileModal from "../../Modals/DeleteProfileModal";

export default function DeleteProfileButton() {
    const dialog = useRef();

    function handleDeleteClick() {
        dialog.current.open();
    }

    return <>
        <DeleteProfileModal ref={dialog} />

        <div className="col-6 d-flex justify-content-center mb-1 mt-5">
            <Link onClick={handleDeleteClick} className={styles["delete-btn"]}>Delete Profile</Link>
        </div>
    </>;
}