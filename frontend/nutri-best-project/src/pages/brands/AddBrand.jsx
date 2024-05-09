import styles from "./css/AddBrand.module.css";
import Loader from "../../components/UI/Shared/Loader";
import Header from "../../components/UI/Shared/Header";
import FormInput from "../../components/UI/Form/FormInput";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import InputError from "../../components/UI/Form/InputError";
import FormButton from "../../components/UI/Form/FormButton";
import BrandImageField from "../../components/UI/Buttons/Brands/BrandImageField";
import { addBrand } from "../../../../../backend/api/api";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useNavigation, useActionData, Form, redirect, useSubmit } from "react-router-dom";

export default function AddBrandPage() {
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
            <Header text={"Add Category"} styles={styles["add-brand-header"]} />
            <Form method="post" encType="multipart/form-data" className={styles["auth-form"]}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <FormInput
                                styles={styles["add-brand-input"]}
                                text="Brand Name"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Name") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Name"][0]}
                                    />}
                                id="name"
                                type="text"
                                name="name"
                                placeholder=""
                            />

                            <FormTextArea
                                styles={styles["add-brand-input"]}
                                text="Description"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Description") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Description"][0]}
                                    />}
                                id="description"
                                name="description"
                                rows={9} />

                            <div className="d-flex flex-column">
                                <BrandImageField />
                            </div>

                            {data && data.errors && Object.keys(data.errors).includes("message") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["message"][0]}
                                />}

                            <FormButton
                                text={"Add Brand"}
                                wrapperStyles={styles["add-brand-input"]}
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
    const brandData = await request.formData();

    try {
        const response = await addBrand(brandData);

        if (response.message) {
            return redirect(`/brands?message=${response.message}&type=danger`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        return redirect(`/brands?message=Successfully Added new brand!&type=success`);
    } catch (error) {
        return redirect("/error");
    }
}