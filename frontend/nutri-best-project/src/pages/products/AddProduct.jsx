import useAuth from "../../hooks/useAuth.js";
import { cleanFilters, getFormData } from "../../utils/utils";
import { getProductErrors } from "../../utils/products/validation.js"
import ProductForm from "./ProductForm";
import { getProductForm, getProductCategories } from "../../utils/products/formHandler.js";
import { addProduct, allBrands } from "../../../../../backend/api/api";
import { useActionData, json, redirect, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";

export default function AddProduct() {
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
        const productModel = await getFormData(request);

        productModel.categories = getProductCategories(productModel);

        const checkProduct = getProductErrors(productModel);

        if (Object.keys(checkProduct.errors).length != 0) {
            return checkProduct;
        }

        const formData = getProductForm(productModel);

        const response = await addProduct(formData);

        if (response == null) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

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

        localStorage.setItem("addMessage", `Successfully Added Product '${productModel.name}'!&success`);
        return redirect("/products/all");
    } catch (error) {
        return json({ errors: { "message": ["An Error occured!"] } });
    }
}