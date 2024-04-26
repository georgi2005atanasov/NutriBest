import styles from "./css/Profile.module.css";
import Header from "../../components/UI/Shared/Header";
import { getProfileDetails } from "../../../../../backend/api/api.js";
import ProfileForm from "./ProfileForm.jsx";
import { useLoaderData } from "react-router-dom";
import ProfileDate from "./ProfileDate.jsx";
import { getFormData } from "../../utils/utils.js";
import { editUser } from "../../../../../backend/api/api.js";

export default function Profile() {
    const { profile } = useLoaderData();

    return <div className={`container-fluid d-flex flex-column align-items-center justify-content-center`}>
        <hr className={styles["profile-info-line"]}/>
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
    </div>
}

export async function loader() {
    const result = await getProfileDetails();

    if (!result.ok) {
        console.log("handle error");
    }

    const profileDetails = await result.json();

    return {
        profile: profileDetails
    };
}

export async function action({request, params}) {
    const data = await getFormData(request);

    const formData = new FormData();
    formData.append("Name", !data.name ? "" : data.name);
    formData.append("UserName", !data.userName ? "" : data.userName);
    formData.append("Age", !data.age ? "" : Number(data.age));
    formData.append("Gender", !data.gender ? "" : data.gender);
    formData.append("Email", !data.email ? "" : data.email);

    // const name = data.get("name");
    // const username = data.get("username");
    // const age = data.get("age");
    // const gender = data.get("gender");

    const response = await editUser(formData);

    return await response.json();
}