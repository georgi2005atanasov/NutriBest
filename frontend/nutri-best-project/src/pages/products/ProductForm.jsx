/* eslint-disable react/prop-types */
import styles from "./css/ProductForm.module.css";
import CategoryBrandContextProvider from "../../store/CategoryBrandContext";
import Header from "../../components/UI/Shared/Header";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import Loader from "../../components/UI/Shared/Loader";
import ImageField from "../../components/UI/Form/ImageField";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import MultiSelectCategory from "../../components/UI/Form/MultiSelectCategory";
import InputError from "../../components/UI/Form/InputError";
import SelectBrand from "../../components/UI/Form/SelectBrand";
import { motion } from "framer-motion";
import { Form, useNavigation } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ProductForm({ product = null, data, header }) {
    const navigation = useNavigation();
    const [brand, setBrand] = useState(product && product.brand || "");

    const isSubmitting = navigation.state === "submitting";

    return <CategoryBrandContextProvider>
        <motion.div
            className="w-100"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
        >
            {isSubmitting && <Loader />}
            <Header text={header} styles={`${styles["add-product-header"]}`} />
            <Form method="post" encType="multipart/form-data" className={styles["auth-form"]}>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <FormInput
                                styles={styles["add-product-input"]}
                                text="Product Name"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Name") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Name"][0]}
                                    />}
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={product ? product.name : undefined}
                                placeholder="Protein, Creatine..."
                            />

                            <FormTextArea
                                styles={styles["add-product-input"]}
                                text="Description"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Description") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Description"][0]}
                                    />}
                                id="description"
                                name="description"
                                defaultValue={product ? product.description : undefined}
                                rows={9} />

                            <FormInput
                                styles={styles["add-product-input"]}
                                text="Price"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Price") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Price"][0]}
                                    />}
                                id="price"
                                type="text"
                                name="price"
                                defaultValue={product ? product.price : undefined}
                                placeholder="100 BGN"
                            />

                            <FormInput
                                styles={`${styles["add-product-input"]}`}
                                text="Quantity"
                                error={
                                    data && data.errors && Object.keys(data.errors).includes("Quantity") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Quantity"][0]}
                                    />}
                                id="quantity"
                                type="number"
                                name="quantity"
                                defaultValue={product ? product.quantity : undefined}
                                placeholder=""
                            />

                            <SelectBrand onSelect={setBrand} brand={product && product.brand} />

                            {data && data.errors && Object.keys(data.errors).includes("Brand") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Brand"][0]}
                                />}
                            
                            <div className="categories-wrapper mt-3">
                                <h5 className={`ms-2 ${styles["category-header"]}`}>Category:</h5>
                                <MultiSelectCategory productCategories={product ? product.categories : undefined} />
                                {data && data.errors && Object.keys(data.errors).includes("Category") &&
                                    <InputError
                                        styles={styles["error-par"]}
                                        text={data.errors["Category"][0]}
                                    />}
                                <p className="mb-4"></p>
                            </div>

                            <ImageField
                                styles={styles}
                                data={data}
                                product={product} />

                            {data && data.errors && Object.keys(data.errors).includes("message") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["message"][0]}
                                />}

                            <FormButton
                                text={header}
                                wrapperStyles={styles["add-product-input"]}
                                disabled={isSubmitting}
                            />

                            <input type="hidden" name="brand" id="brand" value={brand} />

                            <div className="mb-4"></div>
                        </div>
                    </div>
                </div>
            </Form>
        </motion.div>
    </CategoryBrandContextProvider>
}