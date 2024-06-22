import Modal from "../Modal";
import styles from "../css/DeleteModal.module.css";
import { deleteUser } from "../../../../../../../backend/api/profile";
import { deleteUserByAdmin } from "../../../../../../../backend/api/admin";
import { redirect, useSubmit } from "react-router-dom";
import { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
export default forwardRef(function DeleteProfileModal({ profileId }, ref) {
    const submit = useSubmit();

    async function handleDelete() {
        try {
            if (!profileId) {
                await deleteUser();

                window.scrollTo({
                    top: 400,
                    left: 0,
                    behavior: 'smooth'
                });

                ref.current.close();

                localStorage.setItem("successMessage", "Successfully deleted your profile!&type=success");

                return submit("message=Successfully deleted your profile!&type=success",
                    { action: "/logout", method: "post" });
            }
            else {
                await deleteUserByAdmin(profileId);

                window.scrollTo({
                    top: 400,
                    left: 0,
                    behavior: 'smooth'
                });

                ref.current.close();

                return submit(`message=Successfully deleted profile with ID '${profileId}'!&type=success`,
                    { action: "/profiles", method: "GET" });
            }
        } catch (error) {
            return redirect("/error");
        }
    }

    return <Modal ref={ref}>
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div className="text-center">
                    <h4 className={`text ${styles["delete-modal"]}`}>Are You Sure You Want to Delete this Profile?</h4>
                </div>
                <div className={`${styles["modal-buttons"]} d-flex flex-md-row flex-column`}>
                    <button type="submit" onClick={handleDelete} className={styles["delete-btn"]}>Yes, Delete</button>
                    <form method="dialog">
                        <button className={styles["close-btn"]}>No, Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </Modal>;
});