/* eslint-disable react/prop-types */
import styles from "./css/PromoCodeField.module.css";
import { applyPromoCode } from "../../../../../backend/api/api";
import { useRef } from "react";

export default function PromoCodeField({ updateCart }) {
    const promoCode = useRef();

    async function handlePromoCode() {
        await applyPromoCode(promoCode.current.value);
        await updateCart();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        promoCode.current.value = "";
    }

    return <div className="d-flex justify-content-end align-items-center mb-4">
        <input
            id="code"
            name="code"
            type="text"
            ref={promoCode}
            minLength={7}
            maxLength={7}
            className={styles["promo-code-input"]} />
        <button onClick={handlePromoCode} className={styles["promo-code-button"]}>
            Apply Promo Code
        </button>
    </div>
}