import styles from "./css/AllPromoCodes.module.css";
import { allPromoCodes } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";
import PromoCodeItem from "./PromoCodeItem";
import Header from "../../components/UI/Shared/Header";

export default function AllPromoCodes() {
    const { data } = useLoaderData();

    return <motion.div
        className="container-fluid d-flex flex-column align-items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
    >
        <Header text="All Promo Codes" />
        <div className={styles["promo-codes-container"]}>
            {data && data.map(x =>
                <PromoCodeItem key={x.description} item={x} />)}
        </div>
    </motion.div>;
}

export async function loader({ request, params }) {
    try {
        const response = await allPromoCodes();

        if (!response.ok) {
            return redirect("/error");
        }

        const data = await response.json();

        return {
            data
        };
    } catch (error) {
        return redirect("/error");
    }
}