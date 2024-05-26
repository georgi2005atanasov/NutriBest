import styles from "./css/AllPromoCodes.module.css";
import Header from "../../components/UI/Shared/Header";
import Message from "../../components/UI/Shared/Message";
import PromoCodeItem from "./PromoCodeItem";
import { allPromoCodes } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import AddPromoCodeButton from "../../components/UI/Buttons/PromoCodes/AddPromoCodeButton";

export default function AllPromoCodes() {
    const { data } = useLoaderData();
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams(prev => {
                prev.delete("type");
                prev.delete("message");
                return prev;
            })
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }, [setSearchParams]);

    return <>
        {message && <Message addStyles={"mb-0 mt-3"} message={message} messageType={messageType} />}

        <motion.div
            className="container-fluid d-flex flex-column align-items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            <Header text="All Promo Codes" styles="mb-3" />
            <AddPromoCodeButton />
            <div className={styles["promo-codes-container"]}>
                {data && data.map(x =>
                    <PromoCodeItem key={x.description} item={x} />)}
            </div>
        </motion.div>;
    </>


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