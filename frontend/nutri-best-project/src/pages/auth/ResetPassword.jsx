import FormInput from "../../components/UI/Form/FormInput"
import Header from "../../components/UI/Shared/Header";
import FormButton from "../../components/UI/Form/FormButton";
import styles from "./Login.module.css";
import Loader from "../../components/UI/Shared/Loader";
import { getFormData } from "../../utils/utils";
import { resetPassword } from "../../../../../backend/api/auth";
import { motion } from "framer-motion";
import { Form, useNavigate, useActionData, useNavigation, useSearchParams, useSubmit } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPassword() {
    const data = useActionData();
    const submit = useSubmit();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const navigation = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !email) {
            navigate('/?message=Page Not Found!&type=danger');
        }
    }, [token, email, navigate]);

    useEffect(() => {
        if (data && data.message && data.message == "Password reset successful.") {
            return submit("message=Password Reset Successfully!&type=success", {
                action: "/login",
                method: "GET"
            });
        }
    }, [data, submit]);

    const isSubmitting = navigation.state === "submitting";

    return <>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container d-flex flex-column justify-content-center align-items-center">
                {isSubmitting ?
                    <Loader /> :
                    undefined}
                <div className="row">
                    <Header text="Reset Password" />
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center w-100">
                    <div className="col-lg-5">
                        <Form method="post">
                            <FormInput
                                styles={`${styles["login-input"]} mb-0`}
                                text="New Password"
                                id="newPassword"
                                type="password"
                                name="newPassword"
                            />
                            <FormInput
                                styles={`${styles["login-input"]} mb-0`}
                                text="Confirm Password"
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                            />
                            {data && data.message && <span className="text-danger">{data.message}</span>}

                            <input type="hidden" name="token" id="token" value={token} />
                            <input type="hidden" name="email" id="email" value={email} />

                            {data && data.errors && <span className="text-danger mt-3">Email is required!</span>}
                            {data && data.error && <span className="text-danger mt-3">{data.error}</span>}
                            <FormButton
                                text="Reset Password"
                                wrapperStyles={`${styles["login-input"]}`}
                                disabled={isSubmitting}
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}

export async function action({ request, params }) {
    try {
        const data = await getFormData(request);
        const result = await resetPassword(data.newPassword, data.confirmPassword, data.token, data.email);

        return result;
    } catch (error) {
        return null;
    }
}