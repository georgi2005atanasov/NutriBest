/* eslint-disable react/prop-types */
import styles from "../css/DeleteProfileButton.module.css";
import DeleteProfileModal from "../../../Modals/Delete/DeleteProfileModal";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function DeleteProfileButton({ profileId = null }) {
    const dialog = useRef();

    function handleDeleteClick() {
        dialog.current.open();
    }

    return <>
        <DeleteProfileModal
            profileId={profileId}
            ref={dialog} />

        <div className="col-6 d-flex justify-content-center mb-1 mt-5">
            <Link onClick={handleDeleteClick} className={styles["delete-btn"]}>Delete Profile</Link>
        </div>
    </>;
}