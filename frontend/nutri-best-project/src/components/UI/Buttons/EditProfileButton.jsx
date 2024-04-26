import { NavLink } from "react-router-dom"
import styles from "./css/EditProfileButton.module.css";

export default function EditProfileButton({id}) {
    return <div className="col-md-3 d-flex align-items-start justify-content-start">
        <NavLink id={id} className={styles["edit-profile-btn"]}>Edit</NavLink>
    </div>
}