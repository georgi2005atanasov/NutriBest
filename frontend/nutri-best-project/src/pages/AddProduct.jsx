import styles from "./css/AddProduct.module.css";
import FormInput from "../components/UI/Form/FormInput";
import FormButton from "../components/UI/Form/FormButton";
import FormTextArea from "../components/UI/Form/FormTextArea";
import MultiSelectCategory from "../components/UI/Form/MultiSelect";
import Header from "../components/UI/Header";
import InputError from "../components/UI/InputError";
import ImageField from "../components/UI/ImageField";
import Loader from "../components/UI/Loader";
import { getFormData } from "../utils/utils";
import { addProduct } from "../../../../backend/api/api";
import { Form, useActionData, useNavigation, json, redirect } from "react-router-dom";
import CategoryContextProvider from "../store/CategoryContext";
import { CATEGORIES } from "../store/CategoryContext";

export default function AddProductPage() {
    const data = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    return <CategoryContextProvider>
        <Header text="Welcome back to NutriBest!" styles={styles["add-product-header"]} />
        {isSubmitting && <Loader />}
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
                            type="number"
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
                    </div>
                </div>
            </div>
        </Form>
    </CategoryContextProvider>
}

export async function action({ request, params }) {
    const productModel = await getFormData(request)
    productModel.categories = getProductCategories(productModel);
    productModel.price = Number(productModel.price)

    const checkProduct = getProductErrors(productModel);

    if (checkProduct.errors.length != 0) {
        return checkProduct;
    }

    const formData = getProductForm(productModel);

    try {
        const response = await addProduct(formData);
        const { errors } = await response.json();

        if (errors) {
            return { errors };
        }

        if (response.ok == false) {
            return await response.json();
        }

        return redirect("/?message=Product added successfully!");
    } catch (error) {
        console.log(error);
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}

//can be optimized
function getProductCategories(productModel) {
    const categories = [];

    for (const { name, value } of CATEGORIES) {
        if (name in productModel) {
            categories.push(value);
        }
    }

    return categories;
}

function getProductForm(productModel) {
    const formData = new FormData();
    formData.append("name", productModel.name);
    formData.append("description", productModel.description);
    formData.append("price", productModel.price);
    formData.append("categories", productModel.categories);

    if (productModel.image) {
        // formData.append("image", productModel.image);
        formData.append("image", productModel.image, productModel.image.name);
    }

    return formData;
}

function getProductErrors(productModel) {
    let data = {
        errors: {}
    };

    if (productModel.price <= 0) {
        data.errors["Price"] = ["Price must be bigger than 0!"];
    }

    if (productModel.categories.length <= 0) {
        data.errors["Category"] = ["You have to choose at least 1 category!"];
    }

    if (!productModel.description || productModel.description.length == 0) {
        data.errors["Description"] = ["Description is required!"];
    }

    if (!productModel.name || productModel.name.length == 0) {
        data.errors["Name"] = ["Name is required!"];
    }

    if (productModel.image && productModel.image.name == "") {
        data.errors["Image"] = ["Image is required!"];
    }

    return data;
}