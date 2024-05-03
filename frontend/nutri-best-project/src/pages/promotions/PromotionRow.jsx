/* eslint-disable react/prop-types */
import styles from "./css/PromotionRow.module.css";
import { motion, AnimatePresence } from "framer-motion"
import { getDate } from "../../utils/utils"
import { Link } from "react-router-dom";
import EditPromotionButton from "../../components/UI/Promotions/EditPromotionButton";
import DeletePromotionButton from "../../components/UI/Promotions/DeletePromotionButton";
import { changeStatus } from "../../../../../backend/api/api.js";
import { useSubmit } from "react-router-dom";

export default function PromotionRow({ promotion }) {
    const submit = useSubmit();

    async function handleChange(event, promotionId) {
        event.preventDefault();
        await changeStatus(promotionId);
        submit(null, {action: "", method: "GET"});
    }

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
            </motion.td>
            <td>
                <div className="d-flex justify-content-evenly">
                    <EditPromotionButton />
                    <DeletePromotionButton />
                </div>
            </td>
        </motion.tr>
    </AnimatePresence>
}