import styles from "./css/Profile.module.css";
import Header from "../../components/UI/Shared/Header";
import ProfileForm from "./ProfileForm.jsx";
import ProfileDate from "./ProfileDate.jsx";
import { getProfileDetails } from "../../../../../backend/api/api.js";
import { editUser } from "../../../../../backend/api/api.js";
import DeleteProfileButton from "../../components/UI/Buttons/Profile/DeleteProfileButton.jsx";
import { getFormData } from "../../utils/utils.js";
import { getAuthToken } from "../../utils/auth.js";
import useAuth from "../../hooks/useAuth.js";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";
import ProfileSideBar from "./ProfileSideBar.jsx";

export default function Profile() {
    const { profile } = useLoaderData();
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);

    return <>
        <div className="p-0 d-flex align-items-center justify-content-between">
            <motion.div
                className={`container-fluid d-flex flex-column align-items-center justify-content-center p-0`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileSideBar />
                <hr className={`${styles["profile-info-line"]}`} />
                <Header text={"Profile Details"} styles={"d-flex justify-content-center align-items-center"} />
                <div className="row mt-1 w-100 d-flex align-items-start justify-content-center">
                    <div className="my-4 col-lg-6 d-flex flex-column justify-content-center">
                        <ProfileDate text="Created On: " date={profile.createdOn} />
                        <ProfileDate text="Modified On: " date={profile.modifiedOn} />
                    </div>
                    <div className="p-0 col-md-12 w-100">
                        <ProfileForm profile={profile} />
                    </div>
                </div>
                {!isAdmin && <DeleteProfileButton />}
            </motion.div>
        </div>
    </>

}

export async function loader() {
    try {
        const result = await getProfileDetails();

        if (!result.ok) {
            // some handling
            return redirect("/error");
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