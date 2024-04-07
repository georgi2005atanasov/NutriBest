import styles from "./css/AddProduct.module.css";
import Header from "../components/UI/Header";
import FormInput from "../components/UI/FormInput";
import FormButton from "../components/UI/FormButton";
import InputError from "../components/UI/InputError";
import { addProduct } from "../../../../backend/api/api";
import { getFormData } from "../utils/utils";
import { useState } from "react";
import { Form, useActionData, useNavigation, json, redirect } from "react-router-dom";

export default function AddProduct() {
    const data = useActionData();
    const [image, setImage] = useState([]);

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    function getImage(event) {
        const imageToSet = URL.createObjectURL(event.target.files[0])
        setImage(imageToSet);
    }

    function handleSubmit() {
        console.log("It works");
    }

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
                                data && Object.keys(data.errors).includes("ProductName") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["UserName"][0].replace("UserName", "username")}
                                />}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Protein, Creatine..."
                        />

                        <div className={styles["add-product-input"]}>
                            <label htmlFor="description">Description</label>
                            <textarea rows={9} name="description" id="description" />
                        </div>

                        <FormInput
                            styles={styles["add-product-input"]}
                            text="Price"
                            error={
                                data && Object.keys(data.errors).includes("Price") &&
                                <InputError
                                    styles={styles["error-par"]}
                                    text={data.errors["Price"][0].replace("Price", "price")}
                                />}
                            id="price"
                            type="number"
                            name="price"
                            placeholder="100 BGN"
                        />

                        <div className={styles["add-product-input"]}>
                            <input type="file" name="image" onChange={getImage} />
                            <img src={image} alt="Image" name="image-visual" id="image-visual" />
                        </div>

                        {data && Object.keys(data.errors).includes("message") &&
                            <InputError
                                styles={styles["error-par"]}
                                text={data.errors["message"][0]}
                            />}

                        <FormButton
                            text="Add New Product"
                            wrapperStyles={styles["add-product-input"]}
                            disabled={isSubmitting}
                            onClick={handleSubmit}
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

        if (response && response.errors) {
            return response;
        }

        if (response.ok == false) {
            return response;
        }

        return redirect("/");
    } catch (error) {
        console.log(error);
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}