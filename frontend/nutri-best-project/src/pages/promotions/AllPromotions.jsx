import { redirect } from "react-router-dom";
import { allPromotions } from "../../../../../backend/api/promotions";

export default function AllPromotions() {
    return <div>All promos</div>;
}

export async function loader() {
    try {
        const promotions = await allPromotions();
    
        console.log(promotions);
        return null;
    } catch (error) {
        return redirect("/error");
    }
}