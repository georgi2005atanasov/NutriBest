import styles from "./Register.module.css";
import { Form } from "react-router-dom";
import FormButton from "../../components/UI/FormButton";
import FormInput from "../../components/UI/FormInput";
import RegisterCheckBox from "../../components/UI/RegisterCheckBox";
import Header from "../../components/UI/Header";

export default function RegisterPage() {
    return <>
        <Header text="Create a NutriBest Account" styles={styles["register-header"]} />

        <Form method="post" className={styles["auth-form"]}>
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
    console.log(123);
    const data = await request.formData();
    console.log(data);
}