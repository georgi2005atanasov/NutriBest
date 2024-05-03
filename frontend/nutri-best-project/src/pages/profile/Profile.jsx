import styles from "./css/Profile.module.css";
import Header from "../../components/UI/Shared/Header";
import { getProfileDetails } from "../../../../../backend/api/api.js";
import ProfileForm from "./ProfileForm.jsx";
import { redirect, useLoaderData } from "react-router-dom";
import ProfileDate from "./ProfileDate.jsx";
import { getFormData } from "../../utils/utils.js";
import { editUser } from "../../../../../backend/api/api.js";
import DeleteProfileButton from "../../components/UI/Buttons/DeleteProfileButton.jsx";
import useAuth from "../../hooks/useAuth.js";
import { getAuthToken } from "../../utils/auth.js";
import { motion } from "framer-motion";

export default function Profile() {
    const { profile } = useLoaderData();
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);

    return <motion.div
        className={`container-fluid d-flex flex-column align-items-center justify-content-center`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
    >
        <hr className={styles["profile-info-line"]} />
        <Header text={"Profile Details"} styles={"d-flex justify-content-center align-items-center"} />
        <div className="row mt-1 w-100 d-flex align-items-start justify-content-center">
            <div className="my-4 col-lg-6 d-flex flex-column justify-content-center">
                <ProfileDate text="Created On: " date={profile.createdOn} />
                <ProfileDate text="Modified On: " date={profile.modifiedOn} />
            </div>
            <div className="col-md-12 w-100">
                <ProfileForm profile={profile} />
            </div>
        </div>
        {!isAdmin && <DeleteProfileButton />}
    </motion.div>
}

export async function loader() {
    try {
        const result = await getProfileDetails();

        if (!result.ok) {
            console.log("handle error");
        }

        const profileDetails = await result.json();

        return {
            profile: profileDetails
        };
    } catch (error) {
        return redirect("/error");
    }
}

export async function action({ request, params }) {
    try {
        const data = await getFormData(request);

        const formData = new FormData();
        formData.append("Name", !data.name ? "" : data.name);
        formData.append("UserName", !data.userName ? "" : data.userName);
        formData.append("Age", !data.age ? "" : Number(data.age));
        formData.append("Gender", !data.gender ? "" : data.gender);
        formData.append("Email", !data.email ? "" : data.email);

        const response = await editUser(formData);

        return await response.json();
    } catch (error) {
        return redirect("/error");
    }
}