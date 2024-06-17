import styles from "./css/ProfileDetails.module.css";
import useAuth from "../../hooks/useAuth";
import DeleteProfileButton from "../../components/UI/Buttons/Profile/DeleteProfileButton";
import RestoreProfileModal from "../../components/Modals/Profile/RestoreProfileModal";
import SendPromoCodeModal from "../../components/Modals/Profile/SendPromoCodeModal";
import { getProfileDetailsById } from "../../../../../backend/api/profile";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";
import { useRef } from "react";

export default function ProfileDetails() {
    const restoreProfileDialog = useRef();
    const emailSenderDialog = useRef();

    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    const { profile } = useLoaderData();

    function handleRestore() {
        restoreProfileDialog.current.open();
    }

    function handleSendEmail() {
        emailSenderDialog.current.open();
    }

    return (<>
        <RestoreProfileModal ref={restoreProfileDialog} profileId={profile.profileId} />
        <SendPromoCodeModal ref={emailSenderDialog} email={profile.email} />
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            <motion.div
                className={styles["user-details-container"]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles["user-detail-header"]}>
                    <h2>Profile Details</h2>
                </div>
                <div className={styles["user-detail-body"]}>
                    <div className={styles["user-detail-row"]}>
                        <label>Email:</label>
                        <span>{profile.email}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Username:</label>
                        <span>{profile.userName}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Roles:</label>
                        <span>{profile.roles}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Total Orders:</label>
                        <span>{profile.totalOrders}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Total Spent:</label>
                        <span>{profile.totalSpent} BGN</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Country:</label>
                        <span>{profile.country || <strong>-</strong>}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>City:</label>
                        <span>{profile.city || <strong>-</strong>}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Street:</label>
                        <span>{profile.street || <strong>-</strong>}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Street Number:</label>
                        <span>{profile.streetNumber || <strong>-</strong>}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Made On:</label>
                        <span>{new Date(profile.madeOn).toLocaleDateString()}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Modified On:</label>
                        <span>{new Date(profile.modifiedOn).toLocaleDateString()}</span>
                    </div>
                    <div className={styles["user-detail-row"]}>
                        <label>Is Deleted:</label>
                        <span>{profile.isDeleted ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </motion.div>
            {(isAdmin && profile.isDeleted) &&
                <button onClick={handleRestore} className={styles["restore-button"]}>
                    Restore Profile
                </button>}
            {(isAdmin || isEmployee) &&
                <button onClick={handleSendEmail} className={styles["send-promo-button"]}>
                    Send Promo Code
                </button>}
            <DeleteProfileButton
                profileId={profile.profileId}
            />
        </div>
    </>
    );
}

export async function loader({ request, params }) {
    try {
        const { id } = params;

        const profile = await getProfileDetailsById(id);

        return {
            profile
        }
    } catch (error) {
        return redirect("/?message=Page Not found&type=danger");
    }
}