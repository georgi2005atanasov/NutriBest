import { redirect, useLoaderData, json, useActionData, useSubmit, useRouteLoaderData } from "react-router-dom";
import ProductForm from "./ProductForm";
import { editProduct, getProductById } from "../../../../../backend/api/api";
import { getProductForm, getProductCategories } from "../../utils/product/formHandler";
import { getFormData } from "../../utils/utils";
import { cleanFilters } from "../../utils/utils";
import { getProductErrors } from "../../utils/product/validation";
import useAuth from "../../hooks/useAuth";
import { getProductSpecs } from "../../../../../backend/api/products";

export default function EditProduct() {
    const { productData, productSpecs } = useLoaderData();
    const data = useActionData();

    const submit = useSubmit();

    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    if (!isAdmin) {
        return submit("message=Page Not Found!&type=danger",
            { action: "/", method: "get" })
    }

    return <ProductForm
        header={"Edit Product"}
        product={productData} 
        productSpecs={productSpecs}
        data={data} />
}

export async function loader({ request, params }) {
    try {
        const { id } = params;

        const data = await getProductById(id);

        if (!data.ok) {
            return redirect("/?message=Invalid Product was selected");
        }

        const productData = await data.json();
        const specs = await getProductSpecs(id, productData.name);

        if (!specs.ok) {
            return redirect("/?message=Invalid Product was selected");
        }

        const productSpecs = await specs.json();

        return {
            productData,
            productSpecs
        };
    } catch (error) {
        return redirect("/error");
    }
}

export async function action({ request, params }) {
    const { id } = params;

    const productModel = await getFormData(request)
    productModel.categories = getProductCategories(productModel);

    //this is maybe redundant i do not store images on the local storage
    localStorage.removeItem(`image-${id}`);

    if (isNaN(id)) {
        return json({ errors: { "message": ["Invalid product identifier!"] } });
    }

    const checkProduct = getProductErrors(productModel);

    if (Object.keys(checkProduct.errors).length != 0) {
        return checkProduct;
    }

    const formData = getProductForm(productModel);

    try {
        const response = await editProduct(formData, id);

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

        localStorage.setItem("editMessage", `Successfully Edited Product '${productModel.name}'!&success`);
        return redirect("/products/all");
    } catch (error) {
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}