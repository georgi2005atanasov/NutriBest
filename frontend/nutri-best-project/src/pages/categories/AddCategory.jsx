import styles from "./css/AddCategory.module.css";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import Header from "../../components/UI/Shared/Header";
import Loader from "../../components/UI/Shared/Loader";
import InputError from "../../components/UI/Form/InputError";
import { addCategory } from "../../../../../backend/api/categories";
import { motion } from "framer-motion";
import { useNavigation, Form, useActionData, useSubmit, redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";

export default function AddCategoryPage() {
    const data = useActionData();
    const navigation = useNavigation();
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found!&type=danger",
            { action: "/", method: "GET" }
        );
    }

    const isSubmitting = navigation.state === "submitting";
    return <>
        <motion.div
            className="w-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
        >
            {isSubmitting && <Loader />}
            <Header text={"Add Category"} styles={styles["add-category-header"]} />
            <Form method="post" encType="multipart/form-data" className={styles["auth-form"]}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <FormInput
                                styles={styles["add-category-input"]}
                                text="Category Name"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Name") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Name"][0]}
                                    />}
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Vitamins, Creatines..."
                            />

                            {data && data.errors && Object.keys(data.errors).includes("message") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["message"][0]}
                                />}

                            <FormButton
                                text={"Add Category"}
                                wrapperStyles={styles["add-category-input"]}
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

        const response = await addCategory(data);

        if (response.ok == false) {
            const data = await response.json();
            return data;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        return redirect("/categories?message=Successfully Added New Category!&type=success");
    } catch (error) {
        return redirect("/error");
    }
}