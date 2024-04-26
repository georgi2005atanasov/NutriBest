import Header from "../../components/UI/Shared/Header";
import { getProfileDetails } from "../../../../../backend/api/api.js";
import ProfileForm from "./ProfileForm.jsx";

export default function Profile() {
    return <div className="container d-flex flex-column align-items-center justify-content-center mt-3">
        <Header text={"Profile Details"} />
        <div className="mt-2 row w-100 d-flex align-items-center justify-content-center">
            <ProfileForm />
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