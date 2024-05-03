import styles from "../css/Table.module.css";
import { redirect, useRouteLoaderData, useSearchParams } from "react-router-dom";
import { allPromotions } from "../../../../../backend/api/promotions";
import { motion } from "framer-motion";
import PromotionRow from "./PromotionRow";
import Header from "../../components/UI/Shared/Header";
import Message from "../../components/UI/Shared/Message";
import { useEffect } from "react";
import AddPromotionButton from "../../components/UI/Promotions/AddPromotionButton";

export default function AllPromotions() {
    const promotions = useRouteLoaderData("loadPromo");

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
        }, 2000);

        return () => {
            clearTimeout(timeout);
        }
    }, [setSearchParams]);

    return <motion.div
        className={`container ${styles["table-wrapper"]} mt-2 mb-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
    >
        <motion.div
            className="my-3 mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.7 }}
        >
            <motion.div className="d-flex justify-content-start row w-100">
                <div className="col-10 d-flex justify-content-start p-0">
                    <Header text={"Promotions"} styles={"m-0 ms-1"} />
                </div>
                <div className="col-2 d-flex justify-content-end p-0">
                    <AddPromotionButton />
                </div>
            </motion.div>
            {message && <Message message={message} messageType={messageType} />}
        </motion.div>
        <div className="row">
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