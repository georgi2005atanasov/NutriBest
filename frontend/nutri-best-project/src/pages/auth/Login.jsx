import styles from "./Login.module.css";
import { Form, redirect, json, useActionData } from "react-router-dom";
import FormInput from "../../components/UI/FormInput";
import FormButton from "../../components/UI/FormButton";
import FormLink from "../../components/UI/FormLink";
import LoginCheckBox from "../../components/UI/LoginCheckBox";
import Header from "../../components/UI/Header";
import { login } from "../../../../../backend/api/auth.js";

export default function LoginPage() {
    const data = useActionData();

    if (data && data.errors) {
        console.log("Yes, there are errors");
    }

    return <>
        <Header text="Welcome back to NutriBest!" styles={styles["login-header"]} />

        <Form method="post" className={styles["auth-form"]}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <FormInput
                            styles={styles["login-input"]}
                            text="Username"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                        />
                        <FormInput
                            styles={styles["login-input"]}
                            text="Password"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />

                        <LoginCheckBox text="Remember me" />

                        <FormButton
                            text="Login"
                            wrapperStyles={styles["login-input"]}
                        />
                        {/* TODO Add functionality for forgotten password */}
                        <FormLink route="/" styles={styles["form-link"]} text="Forgot password?" />

                        <FormLink route="/register" styles={styles["form-link"]} text="New User? Register Here" />
                    </div>
                </div>
            </div>
        </Form>
    </>
}

// eslint-disable-next-line no-unused-vars, react-refresh/only-export-components
export async function action({ request, params }) {
    const data = await request.formData();
    const userData = Object.fromEntries(data.entries());
    console.log(userData);

    try {
        const response = await login(userData);

        if (response && response.errors) {
           return response; 
        }

        const token = response;
        console.log(token);
        //set token

        return redirect("/");
    } catch (error) {
        throw json(error);
    }
}