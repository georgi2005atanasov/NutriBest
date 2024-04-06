import styles from "./Register.module.css";
import { Form, json, redirect, useActionData } from "react-router-dom";
import FormButton from "../../components/UI/FormButton";
import FormInput from "../../components/UI/FormInput";
import RegisterCheckBox from "../../components/UI/RegisterCheckBox";
import InputError from "../../components/UI/InputError";
import Header from "../../components/UI/Header";
import { register } from "../../../../../backend/api/auth";
import { getFormData } from "../../utils/auth";

export default function RegisterPage() {
    const data = useActionData();

    if (data && (data.errors || data.message)) {
        console.log("Yes, there are errors");
    }

    return <>
        <Header text="Create a NutriBest Account" styles={styles["register-header"]} />

        <Form method="post" className={styles["auth-form"]}>
            {/* {data.errors.map} */}
            <div className="container mb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <FormInput
                            styles={styles["register-input"]}
                            text="Full name"
                            error={data && Object.keys(data.errors).includes("UserName") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["UserName"][0].replace("UserName", "full name")}
                                />}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your full name"
                        />
                        <FormInput
                            styles={styles["register-input"]}
                            text="Email address"
                            error={data && Object.keys(data.errors).includes("Email") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Email"][0].replace("Email", "email")}
                                />}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email address"
                        />
                        <FormInput
                            styles={styles["register-input"]}
                            text="Password"
                            error={data && Object.keys(data.errors).includes("Password") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Password"][0].replace("Password", "password")}
                                />}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your email password"
                        />
                        <FormInput
                            styles={styles["register-input"]}
                            text="Confirm password"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
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
                        />
                    </div>
                </div>
            </div>
        </Form>
    </>
}

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
    const userData = await getFormData(request);

    if (userData.password !== userData.confirmPassword) {
        return json({ errors: { "message": ["Both passwords should match!"] } });
    }

    if (!userData.terms) {
        return json({ errors: { "message": ["You have to agree with Terms of Service and Privacy Policy!"] } });
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
}