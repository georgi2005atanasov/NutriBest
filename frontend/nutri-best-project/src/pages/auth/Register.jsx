import styles from "./Register.module.css";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import RegisterCheckBox from "../../components/UI/Form/RegisterCheckBox";
import InputError from "../../components/UI/Form/InputError";
import Header from "../../components/UI/Shared/Header";
import Loader from "../../components/UI/Shared/Loader";
import { register } from "../../../../../backend/api/auth";
import { getFormData } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Form, json, redirect, useActionData, useSubmit, useOutletContext, useNavigation } from "react-router-dom";

export default function RegisterPage() {
    const data = useActionData();
    const token = useOutletContext("rootLoader");
    const { isAuthenticated } = useAuth(token);
    const submit = useSubmit();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    if (isAuthenticated) {
        submit(null, { action: "/", method: "get" })
    }

    return <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-100"
        >
            {isSubmitting ?
                <Loader /> :
                undefined}
            <Header text="Create a NutriBest Account" styles={styles["register-header"]} />

            <Form method="post">
                {/* {data.errors.map} */}
                <div className="container mb-5">
                    <div className="row w-100 d-flex justify-content-center">
                        <div className="col-md-5">
                            <FormInput
                                styles={styles["register-input"]}
                                text="Username"
                                error={data && Object.keys(data.errors).includes("UserName") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["UserName"][0].replace("UserName", "Username")}
                                    />}
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter a unique username"
                            />
                            <FormInput
                                styles={styles["register-input"]}
                                text="Email address"
                                error={data && Object.keys(data.errors).includes("Email") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Email"][0]}
                                    />}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                            />
                            <FormInput
                                styles={styles["register-input"]}
                                text="Password"
                                error={data && Object.keys(data.errors).includes("Password") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Password"][0]}
                                    />}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your email password"
                            />
                            <FormInput
                                styles={styles["register-input"]}
                                id="confirmPassword"
                                text="Confirm password"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                            />

                            <RegisterCheckBox text="By signing up you agree to our Terms of Service and Privacy Policy" />

                            {data && Object.keys(data.errors).includes("message") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["message"][0]}
                                />}

                            <FormButton
                                text="Sign up"
                                wrapperStyles={styles["register-input"]}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </motion.div>
    </AnimatePresence>
}

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
    try {
        const userData = await getFormData(request);

        const validation = getUserErrors(userData);

        if (validation && Object.keys(validation.errors).length > 0) {
            return validation;
        }

        const response = await register(userData);

        if (response && response.errors) {
            return response;
        }

        if (response && Array.isArray(response)) {
            const message = response[0].description;
            return json({ errors: { "message": [message] } });
        }

        if (response && response.status === 400) {
            return json({ errors: { "message": ["Cannot create already existing users!"] } });
        }

        return redirect("/login");
    } catch (error) {
        return redirect("/error");
    }
}

function getUserErrors(userData) {
    let data = {
        errors: {}
    };

    if (userData.username.trim() == "") {
        data.errors["UserName"] = ["UserName is required!"];
    }

    if (userData.email.trim() == "") {
        data.errors["Email"] = ["Email is required!"];
    }

    if (userData.password.trim() == "" || userData.confirmPassword.trim() == "") {
        data.errors["Password"] = ["Enter your password!"];
    }

    if (userData.password !== userData.confirmPassword) {
        data.errors["Password"] = ["Both passwords should match!"];
    }

    if (!userData.terms) {
        data.errors["message"] =
            ["You have to agree with Terms of Service and Privacy Policy!"];
    }

    return data;
}