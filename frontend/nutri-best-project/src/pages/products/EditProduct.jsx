import { redirect, useLoaderData, json, useActionData, useSubmit, useRouteLoaderData } from "react-router-dom";
import { editProduct, getProductById } from "../../../../../backend/api/api";
import ProductForm from "./ProductForm";
import { getProductForm, getProductCategories } from "../../utils/product/formHandler";
import { getFormData } from "../../utils/utils";
import { cleanFilters } from "../../utils/utils";
import { getProductErrors } from "../../utils/product/validation";
import useAuth from "../../hooks/useAuth";

export default function EditProduct() {
    const { productData } = useLoaderData();
    const data = useActionData();

    const submit = useSubmit();

    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    if (!isAdmin) {
        return submit("message=No such Page Found!&type=danger", 
        { action: "/", method: "get" })
    }

    return <ProductForm header={"Edit Product"} product={productData} data={data} />
}

export async function loader({ request, params }) {
    const { id } = params;

    const data = await getProductById(id);

    if (!data.ok) {
        return redirect("/?message=Invalid Product was selected");
    }

    const productData = await data.json();

    return {
        productData
    };
}

export async function action({ request, params }) {
    const { id } = params;

    const productModel = await getFormData(request)
    productModel.categories = getProductCategories(productModel);

    localStorage.removeItem(`image-${id}`);

    let priceToCheck = productModel.price;
    priceToCheck = priceToCheck.replace(",", ".");
    if (isNaN(priceToCheck)) {
        return json({ errors: { "Price": ["Price must be a number!"] } });
    }

    productModel.price = parseFloat(productModel.price)

    if (isNaN(id)) {
        return json({ errors: { "message": ["Invalid product identifier!"] } });
    }

    const checkProduct = getProductErrors(productModel);

    if (Object.keys(checkProduct.errors).length != 0) {
        return checkProduct;
    }

    const formData = getProductForm(productModel);
    formData.append("productId", Number(id));

    try {
        const response = await editProduct(formData);

        let data = { errors: {} };

        if (isNaN(String(response))) {
            let res = JSON.parse(response);
            const key = res.key;
            const message = res.message;
            data.errors[key] = [message];
            return data;
        }

        cleanFilters();

        return redirect("/?message=Product edited successfully!&type=success");
    } catch (error) {
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}