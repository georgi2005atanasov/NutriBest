import styles from "./css/MultiSelectPromotion.module.css";
import { useLoaderData, useSubmit } from "react-router-dom";
import { changeProductPromotion } from "../../../../../../backend/api/api";
import { useState } from "react";
import InvalidPromotionMessage from "./InvalidPromotionMessage";

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
        <select value={promotions
            .filter(x => x.isActive)
            .some(x => x.promotionId == promotionId) ? promotionId : ""}
            key={productId} title="promotion" onChange={setNewPromotion}
            className={`${styles["custom-select"]} me-5 mb-1 p-1`}
        >
            <option value="">Choose Promotion</option>
            {promotions && promotions.length > 0 && promotions.filter(x => x.isActive)
                .map(p => <option className={styles["option"]} key={p.promotionId} value={p.promotionId}>{p.description.substring(0, 30)}</option>)}
        </select>
        {message && <InvalidPromotionMessage message={message} />}
    </>

}