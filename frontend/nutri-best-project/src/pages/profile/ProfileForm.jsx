import styles from "./css/Profile.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import ProfileChange from "./ProfileChange";
import InputError from "../../components/UI/Form/InputError";
import { memo, useState } from "react";
import { useActionData } from "react-router-dom";
import MultiSelectGender from "./MultiSelectGender";

// eslint-disable-next-line react/prop-types
export default memo(function ProfileForm({ profile }) {
    const data = useActionData();
    console.log(data);
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

    return <section className="mt-3">
        <ProfileChange
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
        </ProfileChange>

        <ProfileChange
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
                className="me-4 ms-3"
            />
        </ProfileChange>

        <ProfileChange
            onBlur={handleBlur}
            identifier="age"
            disabled={activeButtons && activeButtons.some(x => x.key == "age") ? false : true}>
            <FormInput
                styles={`${styles["profile-input"]}`}
                text="Age:"
                error={
                    data && data.errors && Object.keys(data.errors).includes("Age") &&
                    <InputError
                        styles={styles["error-par"]}
                        text={data.errors["Age"][0]}
                    />}
                id="age"
                type="number"
                name="age"
                defaultValue={profile ? profile.age : undefined}
                placeholder=""
                onFocus={handleFocus}
                onChange={handleChange}
                className="me-4 ms-3"
            />
        </ProfileChange>

        <ProfileChange
            onBlur={handleBlur}
            identifier="gender"
            disabled={activeButtons && activeButtons.some(x => x.key == "gender") ? false : true}>
            <MultiSelectGender styles={`${styles["profile-input"]}`} handleChange={handleChange} handleFocus={handleFocus} />
        </ProfileChange>
    </section>
});