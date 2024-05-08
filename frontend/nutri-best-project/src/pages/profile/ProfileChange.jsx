/* eslint-disable react/prop-types */
import EditProfileButton from "../../components/UI/Buttons/Edit/EditProfileButton";
import { Form } from "react-router-dom";

export default function ProfileChange({ disabled, onBlur, identifier, children }) {
    return <Form method="post" className="d-flex flex-lg-row flex-column justify-content-center align-items-center">
        <div className="col-md-8 d-flex justify-content-center align-items-center">
            {children}
        </div>
        <EditProfileButton onBlur={onBlur} identifier={identifier} disabled={disabled} id={"profile-edit-btn"} />
    </Form>;
}