import styles from "./css/Profile.module.css";
import Header from "../../components/UI/Shared/Header";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import EditProfileButton from "../../components/UI/Buttons/EditProfileButton";
import { useActionData, useLoaderData } from "react-router-dom";
import { getProfileDetails } from "../../../../../backend/api/profile";

export default function Profile() {
    const data = useActionData();
    const { profile } = useLoaderData();
    console.log(profile);

    function handleFocus() {
        document.getElementById("profile-edit-btn").innerHTML = "Save";
        document.getElementById("profile-edit-btn").style.backgroundColor = "gold";
    }

    function handleBlur() {
        document.getElementById("profile-edit-btn").innerHTML = "Edit";
        document.getElementById("profile-edit-btn").style.backgroundColor = "#FFF9C4";
    }

    return <div className="container d-flex flex-column align-items-center justify-content-center mt-3">
        <Header text={"Profile Details"} />
        <div className="mt-2 row w-100 d-flex align-items-center justify-content-center">
            <div className="col-md-8 d-flex justify-content-center">
                <section className="d-flex justify-content-center align-items-start">
                    <FormInput
                        styles={`${styles["profile-input"]}`}
                        text="Name:"
                        error={
                            data && data.errors && Object.keys(data.errors).includes("Name") &&
                            <InputError
                                styles={styles["error-par"]}
                                text={data.errors["Name"][0]}
                            />}
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={profile ? profile.name : undefined}
                        placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="mx-3"
                    />
                </section>
            </div>
            <EditProfileButton id={"profile-edit-btn"} />
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