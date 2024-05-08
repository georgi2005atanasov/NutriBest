/* eslint-disable react/prop-types */
import styles from "./css/PromotionRow.module.css";
import EditPromotionButton from "../../components/UI/Promotions/EditPromotionButton";
import DeletePromotionButton from "../../components/UI/Promotions/DeletePromotionButton";
import InputError from "../../components/UI/Form/InputError.jsx";
import { getDate } from "../../utils/utils";
import { changeStatus, getProductsOfPromotion } from "../../../../../backend/api/api.js";
import { motion, AnimatePresence } from "framer-motion";
import { useSubmit, Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export default function PromotionRow({ promotion }) {
    const submit = useSubmit();
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async function getProducts() {
        const products = await getProductsOfPromotion(promotion.promotionId);

        setProducts(products);
    }, [setProducts, promotion]);

    async function handleChange(event, promotionId) {
        event.preventDefault();
        const result = await changeStatus(promotionId);

        if (!result.ok) {
            const { message } = await result.json();
            setMessage(message);
        }

        getProducts();

        submit(null, { action: "", method: "GET" });
    }

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return <AnimatePresence>
        <motion.tr
            className={styles["promo-row"]}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
        >
            <td id="promo-id">
                {promotion.promotionId}
            </td>
            <td>
                {promotion.description}
            </td>
            <td className={!promotion.discountAmount ? styles["empty-field"] : ""}>
                {promotion.discountAmount ? `${promotion.discountAmount} BGN` : "-"}
            </td>
            <td className={!promotion.discountPercentage ? styles["empty-field"] : ""}>
                {promotion.discountPercentage ? `${promotion.discountPercentage}%` : "-"}
            </td>
            <td className={!promotion.minimumPrice ? styles["empty-field"] : ""}>
                {promotion.minimumPrice ? `${promotion.minimumPrice} BGN` : "-"}
            </td>
            <td>
                {getDate(promotion.startDate)}
            </td>
            <td className={!promotion.endDate ? styles["empty-field"] : ""}>
                {getDate(promotion.endDate)}
            </td>
            <motion.td
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
            >
                <Link
                    className={promotion.isActive ? styles["active-promo"] : styles["non-active-promo"]}
                    onClick={(event) => handleChange(event, promotion.promotionId)}
                >
                    {promotion.isActive ? "active" : "disabled"}
                </Link>
                {message && <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                >
                    <InputError text={message} styles={"text-danger"} />
                </motion.div>}
            </motion.td>
            <td className={!promotion.brand ? styles["empty-field"] : ""}>
                {promotion.brand ? `${promotion.brand}` : "-"}
            </td>
            <td className={`${!promotion.category ? styles["empty-field"] : ""}`}>
                {promotion.category ? `${promotion.category}` : "-"}
            </td>
            <td>
                <div className="d-flex justify-content-evenly">
                    <EditPromotionButton promotion={promotion} />
                    <DeletePromotionButton promotion={promotion} />
                </div>
            </td>
            <td>
                {products && products.length ? <div>
                    <strong>{products.length || 0}</strong> products
                </div> :
                    <div>
                        <strong>0</strong> products
                    </div>}
            </td>
        </motion.tr>
    </AnimatePresence>
}