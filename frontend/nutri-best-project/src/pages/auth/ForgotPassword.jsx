import FormInput from "../../components/UI/Form/FormInput"
import Header from "../../components/UI/Shared/Header";
import FormButton from "../../components/UI/Form/FormButton";
import styles from "./Login.module.css";
import { motion } from "framer-motion";
import { useNavigation } from "react-router-dom";

export default function ForgotPassword() {
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
                <div className="row">
                    <Header text="Forgot Password" />
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center w-100">
                    <div className="col-lg-5">
                        <FormInput
                            styles={`${styles["login-input"]} mb-0`}
                            text="Email"
                            id="email"
                            type="email"
                            name="email"
                        />

                        <FormButton
                            text="Send"
                            wrapperStyles={`${styles["login-input"]}`}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}