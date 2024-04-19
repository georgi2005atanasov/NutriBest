import { cleanFilters, getFormData } from "../../utils/utils";
import { getProductErrors } from "../../utils/product/validation"
import { getProductForm, getProductCategories } from "../../utils/product/formHandler";
import { addProduct } from "../../../../../backend/api/api";
import { useActionData, json, redirect, useSubmit, useRouteLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProductForm from "./ProductForm";

export default function AddProductPage() {
    const data = useActionData();
    const submit = useSubmit();

    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    if (!isAdmin) {
        return submit("message=No such Page Found!&type=danger",
            { action: "/", method: "get" })
    }

    return <ProductForm header={"Add New Product"} data={data} />
}

export function loader() {
    cleanFilters();
    return null;
}

// eslint-disable-next-line no-unused-vars
export async function action({ request, params }) {
    try {
        const productModel = await getFormData(request)
        productModel.categories = getProductCategories(productModel);

        productModel.price = parseFloat(productModel.price)

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

        return redirect("/?message=Product added successfully!&type=success");
    } catch (error) {
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}