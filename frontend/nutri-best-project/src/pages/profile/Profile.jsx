import styles from "./css/Profile.module.css";
import Header from "../../components/UI/Shared/Header";
import { getProfileDetails } from "../../../../../backend/api/api.js";
import ProfileForm from "./ProfileForm.jsx";
import { useLoaderData } from "react-router-dom";
import ProfileDate from "./ProfileDate.jsx";

export default function Profile() {
    const { profile } = useLoaderData();

    return <div className="container-fluid d-flex flex-column align-items-center justify-content-center mt-3">
        <Header text={"Profile Details"} />
        <div className="row mt-2 w-100 d-flex align-items-start justify-content-center">
            <div className="my-4 col-lg-6 d-flex flex-column justify-content-center">
                <ProfileDate text="Created On: " date={profile.createdOn} />
                <ProfileDate text="Modified On: " date={profile.modifiedOn} />
            </div>
            <div className="col-md-8 w-75">
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

export async function action() {
    return 111;
}