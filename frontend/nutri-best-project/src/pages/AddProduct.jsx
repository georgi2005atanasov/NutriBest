import styles from "./css/AddProduct.module.css";
import Header from "../components/UI/Header";
import FormInput from "../components/UI/FormInput";
import FormButton from "../components/UI/FormButton";
import InputError from "../components/UI/InputError";
import { addProduct } from "../../../../backend/api/api";
import { getFormData } from "../utils/utils";
import { Form, useActionData, useNavigation, json, redirect } from "react-router-dom";
import ImageField from "../components/UI/ImageField";
import FormTextArea from "../components/UI/FormTextArea";

export default function AddProductPage() {
    const data = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return <>
        <Header text="Welcome back to NutriBest!" styles={styles["add-product-header"]} />
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
                                    text={data.errors["Name"][0].replace("Name", "name")}
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
                                    text={data.errors["Description"][0].replace("Description", "description")}
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
                            type="number"
                            name="price"
                            placeholder="100 BGN"
                        />

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
                    </div>
                </div>
            </div>
        </Form>
    </>
}

export async function action({ request, params }) {
    const productModel = await getFormData(request)
    productModel.price = Number(productModel.price)

    const formData = new FormData();
    formData.append("name", productModel.name);
    formData.append("description", productModel.description);
    formData.append("price", productModel.price);

    if (productModel.image) {
        formData.append("image", productModel.image);
        // formData.append("image", productModel.image, productModel.image.name);
    }

    try {
        const response = await addProduct(formData);
        const { errors } = await response.json();

        if (errors) {
            if (productModel.price <= 0) {
                errors["Price"] = ["Price must be bigger than 0!"]
            }
            return { errors };
        }

        if (response.ok == false) {
            return await response.json();
        }

        return redirect("/");
    } catch (error) {
        console.log(error);
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}