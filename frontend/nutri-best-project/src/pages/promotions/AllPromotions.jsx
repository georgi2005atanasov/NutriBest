import styles from "../css/Table.module.css";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { allPromotions } from "../../../../../backend/api/promotions";
import { motion } from "framer-motion";
import PromotionRow from "./PromotionRow";

export default function AllPromotions() {
    const promotions = useRouteLoaderData("loadPromo");

    return <motion.div
        className={`container ${styles["table-wrapper"]} mt-2 mb-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <div className="row mt-2">
            <table className="">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Discount Amount</th>
                        <th>Discount Percentage</th>
                        <th>Min Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {promotions && promotions.map(p =>
                        <PromotionRow key={p.description} promotion={p} />)}
                </tbody>
            </table>
        </div>
    </motion.div>;
}

export async function loader() {
    try {
        const promotions = await allPromotions();

        return promotions;
    } catch (error) {
        return redirect("/error");
    }
}