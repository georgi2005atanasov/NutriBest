/* eslint-disable react/prop-types */
import styles from "./css/Profile.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import ProfileChange from "./ProfileChange";
import MultiSelectGender from "./MultiSelectGender";
import { useActionData } from "react-router-dom";
import { useCallback, useState } from "react";

export default function ProfileForm({ profile }) {
    const data = useActionData();
    const [activeButtons, setActiveButtons] = useState([]);

    const handleChange = useCallback(function handleChange(event) {
        event.preventDefault();
        setActiveButtons(prevButtons => {
            return [
                ...prevButtons.filter(x => x.key != event.target.id),

                {
                    key: event.target.id,
                    value: prevButtons
                        .find(x => x.key == event.target.id) ?
                        prevButtons.find(x => x.key == event.target.id).value = event.target.value :
                        ""
                }
            ];
        });
    }, []);

    const handleFocus = useCallback(function handleFocus(event) {
        event.preventDefault();

        setActiveButtons(prevButtons => {
            return [...prevButtons, { key: event.target.id, value: "" }];
        })
    }, []);

    const handleBlur = useCallback(function handleBlur(identifier) {
        setActiveButtons(prevButtons => {
            return [...prevButtons.filter(x => x.key != identifier)];
        })
    }, []);

    return <>
        <ProfileChange
            onBlur={handleBlur}
            identifier="email"
            disabled={activeButtons && activeButtons.some(x => x.key == "email") ? false : true}>
            <FormInput
                styles={`${styles["profile-input"]}`}
                text="Email:"
                error={
                    data && data.errors && Object.keys(data.errors).includes("Email") &&
                    <InputError
                        styles={styles["error-par"]}
                        text={data.errors["Email"][0]}
                    />}
                id="email"
                type="email"
                name="email"
                defaultValue={profile ? profile.email : undefined}
                placeholder=""
                onFocus={handleFocus}
                onChange={handleChange}
                className="me-5 ms-5"
            />
        </ProfileChange>

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
            identifier="userName"
            disabled={activeButtons && activeButtons.some(x => x.key == "userName") ? false : true}>
            <FormInput
                styles={`${styles["profile-input"]}`}
                text="Username:"
                error={
                    data && data.errors && Object.keys(data.errors).includes("UserName") &&
                    <InputError
                        styles={styles["error-par"]}
                        text={data.errors["UserName"][0]}
                    />}
                id="userName"
                type="text"
                name="userName"
                defaultValue={profile ? profile.userName : undefined}
                placeholder=""
                onFocus={handleFocus}
                onChange={handleChange}
                className="me-5 ms-4"
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
                className="me-4 ms-5"
            />
        </ProfileChange>

        <ProfileChange
            onBlur={handleBlur}
            identifier="gender"
            disabled={activeButtons && activeButtons.some(x => x.key == "gender") ? false : true}>
            <MultiSelectGender styles={`${styles["profile-input"]} me-5`} handleChange={handleChange} handleFocus={handleFocus} />
        </ProfileChange>

        <div className="d-flex justify-content-center">
            {data && data.message &&
                <InputError
                    styles={styles["error-par"]}
                    text={data.message}
                />}
        </div>
    </>
}