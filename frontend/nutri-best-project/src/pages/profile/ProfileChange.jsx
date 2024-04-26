/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";
import EditProfileButton from "../../components/UI/Buttons/EditProfileButton";

export default function ProfileInput({ onBlur, identifier, children, disabled }) {
    return <Form method="post" className="d-flex justify-content-center align-items-center">
        <div className="col-md-8 d-flex justify-content-center">
            {children}
        </div>
        <EditProfileButton onBlur={onBlur} identifier={identifier} disabled={disabled} id={"profile-edit-btn"} />
    </Form>;
}