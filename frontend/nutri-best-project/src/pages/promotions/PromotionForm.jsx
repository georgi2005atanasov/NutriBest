/* eslint-disable react/prop-types */
import styles from "./css/PromotionForm.module.css";
import { motion } from "framer-motion";
import Header from "../../components/UI/Shared/Header";
import Loader from "../../components/UI/Shared/Loader";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import FormButton from "../../components/UI/Form/FormButton";
import { useNavigation, Form } from "react-router-dom";
import CategoryContextProvider from "../../store/CategoryContext";
import PromotionCategory from "../../components/UI/Promotions/PromotionCategory";
import { useState } from "react";
import DiscountType from "../../components/UI/Promotions/DiscountType";
import SelectBrand from "../../components/UI/Form/SelectBrand";

export const OPTIONS = [
    "amount",
    "percentage"
];

export default function PromotionForm({ header, data, promotion }) {
    const [discountType, setDiscountType] = useState(promotion &&
        promotion.discountAmount ? OPTIONS[0] :
        OPTIONS[1]);

    const [selectedCategory, setSelectedCategory] = useState(promotion &&
        promotion.category ?
        promotion.category :
        "");

    const [selectedBrand, setSelectedBrand] = useState(promotion &&
        promotion.brand ?
        promotion.brand :
        "");

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return <CategoryContextProvider>
        <motion.div
            className="w-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
        >
            {isSubmitting && <Loader />}

            <Header text={header} styles={styles["add-promotion-header"]} />

            <Form method="post" className={styles["auth-form"]}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <FormTextArea
                                styles={styles["add-promotion-input"]}
                                text="Description:"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Description") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Description"][0]}
                                    />}
                                id="description"
                                name="description"
                                defaultValue={promotion ? promotion.description : undefined}
                                rows={3} />

                            <FormInput
                                styles={styles["add-promotion-input"]}
                                text="Start Date:"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("StartDate") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["StartDate"][0]}
                                    />}
                                id="startDate"
                                type="datetime-local"
                                name="startDate"
                                defaultValue={promotion ? promotion.startDate : undefined}
                                placeholder=""
                            />

                            <FormInput
                                styles={`${styles["add-promotion-input"]}`}
                                text="End Date (optional):"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("EndDate") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["EndDate"][0]}
                                    />}
                                id="endDate"
                                type="datetime-local"
                                name="endDate"
                                defaultValue={promotion ? promotion.endDate : undefined}
                                placeholder=""
                            />

                            <FormInput
                                styles={`${styles["add-promotion-input"]}`}
                                text="Minimum price for a product (optional):"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("MinimumPrice") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["MinimumPrice"][0]}
                                    />}
                                id="minimumPrice"
                                type="text"
                                name="minimumPrice"
                                defaultValue={promotion ? promotion.minimumPrice : undefined}
                                placeholder=""
                            />

                            <div className={`ms-3 ${styles["add-promotion-category"]} mb-4`}>
                                <div className={styles["promotion-category-label"]}>Discount Type:</div>
                                <div className="row w-100 d-flex justify-content-start align-items-center">
                                    <div className="col-12 p-0">
                                        <DiscountType onSelect={setDiscountType} />
                                    </div>
                                    <div className="col-12 mt-2 p-0">
                                        {discountType == OPTIONS[0] &&
                                            <div className={`${`${styles["discount-field"]}`} d-flex align-items-end me-5`}>
                                                <input
                                                    type="text"
                                                    id="discountAmount"
                                                    name="discountAmount"
                                                    defaultValue={promotion && promotion.discountAmount}
                                                    className="me-1" /> <strong>BGN</strong>
                                                {
                                                    data && data.errors && Object.keys(data.errors).includes("DiscountAmount") &&
                                                    <InputError
                                                        styles={styles["error-par"]}
                                                        text={data.errors["DiscountAmount"][0]}
                                                    />}
                                            </div>}

                                        {discountType == OPTIONS[1] &&
                                            <div className={`${`${styles["discount-field"]}`} d-flex align-items-center me-5`}>
                                                <input
                                                    type="text"
                                                    id="discountPercentage"
                                                    name="discountPercentage"
                                                    defaultValue={promotion && promotion.discountPercentage}
                                                    className="me-1" /> <strong>%</strong>
                                            </div>}

                                        {
                                            data && data.errors && Object.keys(data.errors).includes("DiscountPercentage") &&
                                            <InputError
                                                styles={styles["error-par"]}
                                                text={data.errors["DiscountPercentage"][0]
                                                    .replace("field DiscountPercentage", "Discount Percentage")}
                                            />}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles["add-promotion-category"]}`}>
                                <div className={styles["promotion-category-label"]}>Category (optional):</div>
                                <PromotionCategory onSelect={setSelectedCategory} category={promotion && promotion.category} />
                            </div>

                            <div className={`${styles["add-promotion-category"]} mt-2`}>
                                <div className={styles["promotion-category-label"]}>Brand (optional):</div>
                                <SelectBrand onSelect={setSelectedBrand} brand={promotion && promotion.brand} />
                            </div>

                            {data && data.errors && Object.keys(data.errors).includes("message") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["message"][0]}
                                />}

                            <FormButton
                                text={header}
                                wrapperStyles={styles["add-promotion-input"]}
                                disabled={isSubmitting}
                            />

                            <input type="hidden" name="category" value={selectedCategory} />
                            {/* <input type="hidden" name="brand" value={selectedBrand} /> */}

                            <div className="mb-4"></div>
                        </div>
                    </div>
                </div>
            </Form>
        </motion.div>
    </CategoryContextProvider>;
}