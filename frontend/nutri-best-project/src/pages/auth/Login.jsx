import styles from "./Login.module.css";
import FormInput from "../../components/UI/FormInput";
import FormButton from "../../components/UI/FormButton";
import FormLink from "../../components/UI/FormLink";
import LoginCheckBox from "../../components/UI/LoginCheckBox";
import InputError from "../../components/UI/InputError";
import Header from "../../components/UI/Header";
import useAuth from "../../components/hooks/useAuth";
import { login } from "../../../../../backend/api/auth";
import { setAuthToken, setTokenDuration } from "../../utils/auth";
import { getFormData } from "../../utils/utils";
import { Form, redirect, json, useActionData, useOutletContext, useSubmit, useNavigation } from "react-router-dom";
import Loader from "../../components/UI/Loader";

export default function LoginPage() {
    const data = useActionData();
    const token = useOutletContext("rootLoader");
    const { isAuthenticated } = useAuth(token);
    const submit = useSubmit();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    if (isAuthenticated) {
        submit(null, { action: "/", method: "get" })
    }

    return <>
        {isSubmitting ?
            <Loader /> :
            undefined}
        <Header text="Welcome back to NutriBest!" styles={styles["login-header"]} />
        <Form method="post">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-5">
                        <FormInput
                            styles={styles["login-input"]}
                            text="Username"
                            error={
                                data && Object.keys(data.errors).includes("UserName") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["UserName"][0].replace("UserName", "username")}
                                />}
                            id="username"
                            type="text"
                            name="username"
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
                            id="password"
                            type="password"
                            name="password"
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
                            disabled={isSubmitting}
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
    try {
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
            setTokenDuration(1);
        }
        else {
            setTokenDuration(24)
        }

        return redirect("/");
    } catch (error) {
        return redirect("/error");
    }
}