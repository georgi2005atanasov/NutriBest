import PromotionForm from "./PromotionForm";
import { getFormData } from "../../utils/utils";
import { getPromotionErrors } from "../../utils/promotion/validation";
import { getPromotionForm } from "../../utils/promotion/formHandler";
import { getAuthToken } from "../../utils/auth";
import { addPromotion } from "../../../../../backend/api/promotions";
import useAuth from "../../hooks/useAuth";
import { useActionData, useSubmit, redirect } from "react-router-dom";

export default function AddPromotion() {
    const token = getAuthToken();
    const data = useActionData();
    const {isAdmin, isEmployee} = useAuth(token);
    const submit = useSubmit();

    if (!isAdmin && !isEmployee) {
        return submit("message=Page Not Found&type=danger", {action: "/", method: "GET"});
    }

    return <PromotionForm header="Add Promotion" data={data} />;
}

export async function action({ request, params }) {
    const promotion = await getFormData(request);
    console.log(promotion);

    const checkPromotion = getPromotionErrors(promotion);

    if (Object.keys(checkPromotion.errors).length != 0) {
        return checkPromotion;
    }

    const formData = getPromotionForm(promotion);

    try {
        const response = await addPromotion(formData);

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

        return redirect(`/promotions/?message=Successfully Added New Promotion!&type=success`);
    } catch (error) {
        return redirect("/error");
    }
}