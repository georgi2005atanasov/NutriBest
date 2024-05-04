import { redirect, useSubmit, useActionData, useRouteLoaderData } from "react-router-dom";
import { editPromotion, getPromotionById } from "../../../../../backend/api/api";
import PromotionForm from "./PromotionForm";
import { getPromotionErrors } from "../../utils/promotion/validation";
import { getFormData } from "../../utils/utils";
import { getPromotionForm } from "../../utils/promotion/formHandler";
import useAuth from "../../hooks/useAuth";
import { getAuthToken } from "../../utils/auth";

export default function EditPromotionPage() {
    const promotion = useRouteLoaderData("promoLoader");
    const data = useActionData();
    const token = getAuthToken();
    const {isAdmin, isEmployee} = useAuth(token);
    const submit = useSubmit();

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found&type=danger", {action: "/", method: "GET"});
    }

    return <PromotionForm header={"Edit Promotion"} data={data} promotion={promotion} />;
}

export async function loader({ request, params }) {
    const { id } = params;

    try {
        const promotion = await getPromotionById(id);

        return promotion;
    } catch (error) {
        return redirect("/error");
    }
}

export async function action({ request, params }) {
    const { id } = params;
    try {
        const promotion = await getFormData(request);

        const checkPromotion = getPromotionErrors(promotion);

        if (checkPromotion.errors.length > 0) {
            return checkPromotion;
        }

        const formData = getPromotionForm(promotion);

        const response = await editPromotion(id, formData);

        if (response.errors) {
            return response;
        }

        let data = { errors: {} };

        if (response.message) {
            if (response.key) {
                data.errors[response.key] = [response.message];
            }
            else {
                data.errors["message"] = [response.message];
            }

            return data;
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        return redirect("/promotions?message=Successfully edited promotion!&type=success");
    } catch (error) {
        return redirect("/error");
    }
}