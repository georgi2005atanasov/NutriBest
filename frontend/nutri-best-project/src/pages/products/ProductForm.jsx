/* eslint-disable react/prop-types */
import CategoryContextProvider from "../../store/CategoryContext";
import Header from "../../components/UI/Header";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import Loader from "../../components/UI/Loader";
import ImageField from "../../components/UI/ImageField";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import MultiSelectCategory from "../../components/UI/Form/MultiSelectCategory";
import InputError from "../../components/UI/InputError";
import { Form, useNavigation } from "react-router-dom";
import styles from "../css/ProductForm.module.css";


// eslint-disable-next-line react/prop-types
export default function ProductForm({ product = null, data, header }) {
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return <CategoryContextProvider>
        {isSubmitting && <Loader />}
        <Header text={header} styles={`${styles["add-product-header"]} mt-5`} />
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

                        <div className="categories-wrapper">
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

                        <div className="mb-4"></div>
                    </div>
                </div>
            </div>
        </Form>
    </CategoryContextProvider>
}