import CategoryContextProvider from "../../store/CategoryContext";
import Header from "../../components/UI/Header";
import FormButton from "../../components/UI/Form/FormButton";
import FormInput from "../../components/UI/Form/FormInput";
import Loader from "../../components/UI/Loader";
import FormTextArea from "../../components/UI/Form/FormTextArea";
import MultiSelectCategory from "../../components/UI/Form/MultiSelectCategory";
import InputError from "../../components/UI/InputError";
import { Form } from "react-router-dom";


export default function ProductForm({ product }) {
    return <CategoryContextProvider>
        {isSubmitting && <Loader />}
        <Header text="Add New Product" styles={styles["add-product-header"]} />
        <Form method="post" encType="multipart/form-data" className={styles["auth-form"]}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-5">
                        <FormInput
                            styles={styles["add-product-input"]}
                            text="Product Name"
                            error={
                                data && Object.keys(data.errors).includes("Name") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Name"][0]}
                                />}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Protein, Creatine..."
                        />

                        <FormTextArea
                            styles={styles["add-product-input"]}
                            text="Description"
                            error={
                                data && Object.keys(data.errors).includes("Description") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Description"][0]}
                                />}
                            id="description"
                            name="description"
                            rows={9} />

                        <FormInput
                            styles={styles["add-product-input"]}
                            text="Price"
                            error={
                                data && Object.keys(data.errors).includes("Price") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Price"][0]}
                                />}
                            id="price"
                            type="text"
                            name="price"
                            placeholder="100 BGN"
                        />

                        <div className="categories-wrapper">
                            <MultiSelectCategory />
                            {data && Object.keys(data.errors).includes("Category") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Category"][0]}
                                />}
                            <p className="mb-4"></p>
                        </div>

                        <ImageField
                            styles={styles}
                            data={data} />

                        {data && Object.keys(data.errors).includes("message") &&
                            <InputError
                                styles={styles["error-par"]}
                                text={data.errors["message"][0]}
                            />}

                        <FormButton
                            text="Add New Product"
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