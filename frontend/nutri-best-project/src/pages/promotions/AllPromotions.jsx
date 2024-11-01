import styles from "../css/Table.module.css";
import PromotionRow from "./PromotionRow";
import Header from "../../components/UI/Shared/Header";
import Message from "../../components/UI/Shared/Message";
import AddPromotionButton from "../../components/Promotions/AddPromotionButton";
import DownloadCsvButton from "../../components/UI/Buttons/Download/DownloadCsvButton";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { allPromotions, exportPromotions } from "../../../../../backend/api/api";
import { redirect, useRouteLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AllPromotions() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

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

    useEffect(() => {
        if (!isAdmin && !isEmployee) {
            return submit("message=Page Not Found!&type=danger",
                { action: "/", method: "GET" });
        }
    }, [isAdmin, isEmployee, submit]);

    if (!isAdmin && !isEmployee) {
        return;
    }

    return <motion.div
        className={`container ${styles["table-wrapper"]} mt-2 mb-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
    >
        <div className="my-3 mt-3"
        >
            <div className="d-flex justify-content-start row w-100">
                <div className="col-md-10 d-flex justify-content-start p-0">
                    <Header text={"Promotions"} styles={"m-0 ms-1"} />
                </div>
                <div className="col-md-2 d-flex justify-content-end p-0">
                    <AddPromotionButton />
                </div>
            </div>
            {message && <Message message={message} messageType={messageType} />}
        </div>
        <div className="row">
            <table className="">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Discount Amount</th>
                        <th>Discount Percentage</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th>Applied to</th>
                    </tr>
                </thead>
                <tbody className="">
                    {promotions && promotions.map(p =>
                        <PromotionRow key={p.description} promotion={p} />)}
                </tbody>
            </table>
            <DownloadCsvButton
                exportFunction={exportPromotions}
                fileName="promotions" />
        </div>
    </motion.div>;
}

export async function loader() {
    try {
        const promotions = await allPromotions(true);
        return promotions;
    } catch (error) {
        return redirect("/error");
    }
}