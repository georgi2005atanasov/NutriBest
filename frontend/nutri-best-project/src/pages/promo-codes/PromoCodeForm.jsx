import styles from "./css/PromoCodeForm.module.css";
import Header from "../../components/UI/Shared/Header";
import FormInput from "../../components/UI/Form/FormInput";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import FormButton from "../../components/UI/Form/FormButton";
import InputError from "../../components/UI/Form/InputError";
import { getFormData } from "../../utils/utils";
import { getAuthToken } from "../../utils/auth";
import { createPromoCodes } from "../../../../../backend/api/promoCodes";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { Form, redirect, useActionData, useSubmit } from "react-router-dom";

export default function PromoCodeForm() {
    const data = useActionData();
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found&type=danger", {
            action: "/",
            method: "GET"
        });
    }

    return <motion.div
        className="w-100 mt-0"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
    >
        <Header text="Add Promo Code" />
        <Form method="post">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12">
                        <FormInput
                            styles={`${styles["discount"]} d-flex justify-content-center align-items-center`}
                            text="Discount Percentage:"
                            error={
                                data && data.errors && Object.keys(data.errors).includes("DiscountPercentage") &&
                                <InputError
                                    styles="text-danger"
                                    text={data.errors["DiscountPercentage"][0]}
                                /> ||
                                data && data.message && data.key && data.key == "DiscountPercentage" &&
                                <InputError
                                    styles="text-danger"
                                    text={data.message}
                                />
                            }
                            id="discountPercentage"
                            type="text"
                            name="discountPercentage"
                            placeholder="%"
                            className="w-25"
                        />
                        <FormTextArea
                            styles={`${styles["discount"]} d-flex justify-content-center align-items-center`}
                            text="Description"
                            id="description"
                            error={
                                data && data.errors && Object.keys(data.errors).includes("Description") &&
                                <InputError
                                    styles="text-danger"
                                    text={data.errors["Description"][0]}
                                /> ||
                                data && data.message && data.key && data.key == "Description" &&
                                <InputError
                                    styles="text-danger"
                                    text={data.message}
                                />
                            }
                            name="description"
                            rows={6}
                            className="w-25" />
                        <FormInput
                            styles={`${styles["discount"]} d-flex justify-content-center align-items-center`}
                            text="Total Count:"
                            error={
                                data && data.errors && Object.keys(data.errors).includes("Count") &&
                                <InputError
                                    styles="text-danger"
                                    text={data.errors["Count"][0]}
                                /> ||
                                data && data.message && data.key && data.key == "Count" &&
                                <InputError
                                    styles="text-danger"
                                    text={data.message}
                                />
                            }
                            id="count"
                            type="number"
                            name="count"
                            className="w-25"
                        />

                        <div className="d-flex justify-content-center">
                            {data && data.message && !data.key &&
                                <InputError
                                    styles="text-danger"
                                    text={data.message}
                                />}
                        </div>

                        <div className="d-flex justify-content-center">
                            <FormButton
                                text="Add Promo Code"
                                wrapperStyles={`${styles["discount"]} w-25`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </motion.div>
}

export async function action({ request, params }) {
    try {
        const data = await getFormData(request);

        const response = await createPromoCodes(data);

        if (!response.ok) {
            const result = await response.json();
            return result;
        }

        return redirect("/promo-codes?message=Successfully Added Promo Codes!&type=success");
    } catch (error) {
        return redirect("/error");
    }
}