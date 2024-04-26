import styles from "./css/Profile.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import ProfileInput from "./ProfileChange";
import InputError from "../../components/UI/Form/InputError";
import { memo, useState } from "react";
import { useActionData, useLoaderData } from "react-router-dom";

export default memo(function ProfileForm() {
    const data = useActionData();
    console.log(data);
    const { profile } = useLoaderData();
    const [activeButtons, setActiveButtons] = useState([]);

    function handleChange(event) {
        setActiveButtons(prevButtons => {
            return [
                ...prevButtons.filter(x => x.key != event.target.id),

                {
                    key: event.target.id,
                    value: prevButtons
                        .find(x => x.key == event.target.id).value = event.target.value
                }
            ];
        });
    }

    function handleFocus(event) {
        setActiveButtons(prevButtons => {
            return [...prevButtons, { key: event.target.id, value: "" }];
        })
    }

    function handleBlur(identifier) {
        console.log(activeButtons.find(x => x.key == identifier));
        setActiveButtons(prevButtons => {
            return [...prevButtons.filter(x => x.key != identifier)];
        })
    }

    return <>
        <ProfileInput
            onBlur={handleBlur}
            identifier="name"
            disabled={activeButtons && activeButtons.some(x => x.key == "name") ? false : true}>
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
                onChange={handleChange}
                className="mx-3"
            />
        </ProfileInput>

        <ProfileInput
            onBlur={handleBlur}
            identifier="username"
            disabled={activeButtons && activeButtons.some(x => x.key == "username") ? false : true}>
            <FormInput
                styles={`${styles["profile-input"]}`}
                text="Username:"
                error={
                    data && data.errors && Object.keys(data.errors).includes("UserName") &&
                    <InputError
                        styles={styles["error-par"]}
                        text={data.errors["UserName"][0]}
                    />}
                id="username"
                type="text"
                name="username"
                defaultValue={profile ? profile.userName : undefined}
                placeholder=""
                onFocus={handleFocus}
                onChange={handleChange}
                className="me-5 ms-3"
            />
        </ProfileInput>
    </>
});