import styles from "./Register.module.css";
import { Form, json, redirect, useActionData } from "react-router-dom";
import FormButton from "../../components/UI/FormButton";
import FormInput from "../../components/UI/FormInput";
import RegisterCheckBox from "../../components/UI/RegisterCheckBox";
import Header from "../../components/UI/Header";
import { register } from "../../../../../backend/api/auth";
import { getFormData } from "../../utils/util";

export default function RegisterPage() {
    const data = useActionData();

    if (data && (data.errors || data.message)) {
        console.log("Yes, there are errors");
    }

    return <>
        <Header text="Create a NutriBest Account" styles={styles["register-header"]} />

        <Form method="post" className={styles["auth-form"]}>
            {/* {data.errors.map} */}
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <FormInput
                            styles={styles["register-input"]}
                            text="Full name"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your full name"
                        />
                        <FormInput
                            styles={styles["register-input"]}
                            text="Email address"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email address"
                        />
                        <FormInput
                            styles={styles["register-input"]}
                            text="Password"
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

    const response = await register(userData);

    if (response && response.errors) {
        return response;
    }

    return redirect("/login");
}