import styles from "./css/MultiSelectPromotion.module.css";
import InvalidPromotionMessage from "./InvalidPromotionMessage";
import { changeProductPromotion } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function MultiSelectPromotion({ promotionId, productId }) {
    const { promotions } = useLoaderData();
    const [message, setMessage] = useState("");
    const submit = useSubmit();

    async function setNewPromotion(event) {
        const response = await changeProductPromotion(Number(event.target.value), productId);

        if (response.message) {
            setMessage(response.message);
        }
        else {
            setMessage("");
            submit(null, { action: "", method: "GET" });
        }
    }

    return <>
        <motion.select value={promotions
            .filter(x => x.isActive)
            .some(x => x.promotionId == promotionId) ? promotionId : ""}
            key={productId} title="promotion" onChange={setNewPromotion}
            className={`${styles["custom-select"]} ms-1 mt-1 me-5 mb-1 p-1 w-75`}
        >
            <motion.option
                value=""
            >
                Choose Promotion
            </motion.option>
            {promotions && promotions.length > 0 && promotions.filter(x => x.isActive)
                .map(p => <motion.option className={styles["option"]} key={p.promotionId} value={p.promotionId}>{p.description}</motion.option>)}
        </motion.select>
        {message && <InvalidPromotionMessage message={message} />}
    </>

}