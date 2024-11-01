import ProductForm from "./ProductForm";
import { editProduct, getProductById } from "../../../../../backend/api/api";
import { getProductForm, getProductCategories } from "../../utils/products/formHandler.js";
import { getFormData } from "../../utils/utils";
import { cleanFilters } from "../../utils/utils";
import { getProductErrors } from "../../utils/products/validation.js";
import useAuth from "../../hooks/useAuth";
import { getProductSpecs } from "../../../../../backend/api/products";
import { redirect, useLoaderData, json, useActionData, useSubmit, useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function EditProduct() {
    const { productData, productSpecs } = useLoaderData();
    const data = useActionData();
    const submit = useSubmit();
    const token = useRouteLoaderData("rootLoader");
    const { isAdmin, isEmployee } = useAuth(token);

    useEffect(() => {
        if (!isAdmin && !isEmployee) {
            return submit("message=Page Not Found!&type=danger",
                { action: "/", method: "GET" });
        }
    }, [isAdmin, isEmployee, submit]);

    if (!isAdmin && !isEmployee) {
        return;
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

        if (data == null) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

        if (!data.ok) {
            return redirect("/?message=Invalid Product was selected&type=danger");
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