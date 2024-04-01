import styles from "./Login.module.css";
import { Form, redirect, json, useActionData } from "react-router-dom";
import FormInput from "../../components/UI/FormInput";
import FormButton from "../../components/UI/FormButton";
import FormLink from "../../components/UI/FormLink";
import LoginCheckBox from "../../components/UI/LoginCheckBox";
import Header from "../../components/UI/Header";
import { login } from "../../../../../backend/api/auth.js";
import InputError from "../../components/UI/InputError.jsx";
import { setAuthToken, getFormData, setNormalTokenDuration } from "../../utils/util.js";

export default function LoginPage() {
    const data = useActionData();

    return <>
        <Header text="Welcome back to NutriBest!" styles={styles["login-header"]} />

        <Form method="post" className={styles["auth-form"]}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <FormInput
                            styles={styles["login-input"]}
                            text="Username"
                            error={
                                data && Object.keys(data.errors).includes("UserName") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["UserName"][0].replace("UserName", "username")}
                                />}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                        />

                        <FormInput
                            styles={styles["login-input"]}
                            text="Password"
                            error={data && Object.keys(data.errors).includes("Password") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Password"][0].replace("Password", "password")}
                                />}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />

                        <LoginCheckBox text="Remember me" />

                        {data && Object.keys(data.errors).includes("message") &&
                            <InputError
                                styles={styles["error-par"]}
                                text={data.errors["message"][0]}
                            />}

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

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
    const userData = await getFormData(request);
    const response = await login(userData);

    if (response && response.errors) {
        return response;
    }

    if (response.ok == false || response.status === 401) {
        return json({ errors: { "message": ["Invalid credentials!"] } });
    }

    const token = response;
    setAuthToken(token);

    if (!userData.remember) {
        setNormalTokenDuration();
    }
    else {
        // setExtendedTokenDuration();
        // must extent the time of the token life
    }

    return redirect("/home");
}