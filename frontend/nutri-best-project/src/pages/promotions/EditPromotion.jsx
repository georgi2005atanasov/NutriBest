import { redirect, useRouteLoaderData } from "react-router-dom";
import PromotionForm from "./PromotionForm";
import { getPromotionById } from "../../../../../backend/api/api";

export default function EditPromotionPage() {
    const promotion = useRouteLoaderData("promoLoader");

    return <PromotionForm header={"Edit Promotion"} promotion={promotion} />;
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
        const data = await request.formData();

        return redirect("/promotions?message=Successfully edited promotion!&type=success");
    } catch (error) {
        return redirect("error");
    }
}