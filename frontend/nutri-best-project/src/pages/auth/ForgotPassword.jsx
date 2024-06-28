import FormInput from "../../components/UI/Form/FormInput"
import Header from "../../components/UI/Shared/Header";
import Loader from "../../components/UI/Shared/Loader";
import FormButton from "../../components/UI/Form/FormButton";
import styles from "./Login.module.css";
import { getFormData } from "../../utils/utils";
import { sendForgottenPasswordMessage } from "../../../../../backend/api/email";
import { motion } from "framer-motion";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function ForgotPassword() {
    const data = useActionData();
    const navigation = useNavigation();
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
                    <Header text="Forgot Password" />
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center w-100">
                    <div className="col-lg-5">
                        <Form method="post">
                            <FormInput
                                styles={`${styles["login-input"]} mb-0`}
                                text="Email"
                                id="email"
                                type="email"
                                name="email"
                            />
                            {data && data.errors && <span className="text-danger mt-3">Email is required!</span>}
                            {data && data.error && <span className="text-danger mt-3">{data.error}</span>}
                            {data && data.message && <span className="text-success mt-3">{data.message}</span>}
                            <FormButton
                                text="Send"
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
        const response = await sendForgottenPasswordMessage(data.email);
        const result = await response.json();

        return result;
    } catch (error) {
        return null;
    }
}