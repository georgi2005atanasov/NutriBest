import { redirect, useLoaderData } from "react-router-dom";
import { getProductById } from "../../../../../backend/api/api";
// import CategoryContextProvider from "../../store/CategoryContext";
// import Loader from "../../components/UI/Loader";
// import InputError from "../../components/UI/InputError";
// import Header from "../../components/UI/Header";
// import { Form } from "react-router-dom";

export default function EditProduct() {
    const { productData } = useLoaderData();

    if (productData) {
        return
    }
    else {
        return <div className="text-center">Product Not Found!</div>
    }
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