import styles from "./css/EditProfileButton.module.css";

// eslint-disable-next-line react/prop-types
export default function EditProfileButton({ onBlur, disabled, identifier }) {
    function handleEdit(event) {
        if (event.target.innerHTML == "Save") {
            onBlur(identifier);
        }
    }

    return <div className="col-md-2 d-flex align-items-start justify-content-start">
        <button
            onClick={handleEdit}
            className={`${styles["edit-profile-btn"]} 
        ${disabled ? `${styles["disabled-color"]} d-none` : styles["active-color"]}`}>
            {disabled ? "Edit" : "Save"}
        </button>
    </div>
}