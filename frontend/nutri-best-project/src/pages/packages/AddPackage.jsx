import styles from "./css/AddPackage.module.css";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import Header from "../../components/UI/Shared/Header";
import Loader from "../../components/UI/Shared/Loader";
import InputError from "../../components/UI/Form/InputError";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { addPackage } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useNavigation, Form, useActionData, useSubmit, redirect } from "react-router-dom";
import { useEffect } from "react";

export default function AddPackage() {
    const data = useActionData();
    const navigation = useNavigation();
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

    useEffect(() => {
        if (!isAdmin && !isEmployee) {
            return submit("message=Page Not Found!&type=danger",
                { action: "/", method: "GET" });
        }
    }, [isAdmin, isEmployee, submit]);

    const isSubmitting = navigation.state === "submitting";

    if (!isAdmin && !isEmployee) {
        return;
    }

    return <>
        <motion.div
            className="w-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
        >
            {isSubmitting && <Loader />}
            <Header text={"Add Package Size"} styles={styles["add-package-header"]} />
            <Form method="post" encType="multipart/form-data" className={styles["auth-form"]}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <FormInput
                                styles={styles["add-package-input"]}
                                text="Package Grams"
                                id="grams"
                                type="number"
                                name="grams"
                                placeholder="2000, 3000..."
                            />

                            {data && data.message &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.message}
                                />}

                            <FormButton
                                text={"Add Package"}
                                wrapperStyles={styles["add-package-input"]}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </motion.div>
    </>
}

export async function action({ request, params }) {
    try {
        const data = await request.formData();

        const response = await addPackage(data);

        if (response.ok == false) {
            const data = await response.json();
            return data;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        return redirect("/packages?message=Successfully added new Package!&type=success");
    } catch (error) {
        return redirect("/error");
    }
}