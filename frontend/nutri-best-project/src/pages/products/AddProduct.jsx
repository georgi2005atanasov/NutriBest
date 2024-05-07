import { cleanFilters, getFormData } from "../../utils/utils";
import { getProductErrors } from "../../utils/product/validation"
import { getProductForm, getProductCategories } from "../../utils/product/formHandler";
import { addProduct, allBrands } from "../../../../../backend/api/api";
import { useActionData, json, redirect, useSubmit, useRouteLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProductForm from "./ProductForm";

const SUCCESS_MESSAGE = "Successfully added new product!&success"

export default function AddProductPage() {
    const data = useActionData();
    const submit = useSubmit();

    const token = useRouteLoaderData("rootLoader");
    const { isAdmin, isEmployee } = useAuth(token);

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found!&type=danger",
            { action: "/", method: "get" })
    }

    return <ProductForm header={"Add New Product"} data={data} />
}

export async function loader() {
    cleanFilters();

    var brands = await allBrands();

    return {
        brands
    };
}

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
    try {
        const productModel = await getFormData(request)
        productModel.categories = getProductCategories(productModel);

        const checkProduct = getProductErrors(productModel);

        if (Object.keys(checkProduct.errors).length != 0) {
            return checkProduct;
        }

        const formData = getProductForm(productModel);

        const response = await addProduct(formData);

        let data = { errors: {} };

        if (isNaN(String(response))) {
            let res = JSON.parse(response);
            const key = res.key;
            const message = res.message;
            data.errors[key] = [message];
            return data;
        }

        cleanFilters();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        localStorage.setItem("addMessage", SUCCESS_MESSAGE);
        return redirect("/products/all");
    } catch (error) {
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}