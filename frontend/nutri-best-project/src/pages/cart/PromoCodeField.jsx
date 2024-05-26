/* eslint-disable react/prop-types */
import styles from "./css/PromoCodeField.module.css";
import { applyPromoCode } from "../../../../../backend/api/api";
import { useEffect, useRef } from "react";

export default function PromoCodeField({ updateCart }) {
    const promoCode = useRef();
    const message = useRef("");

    async function handlePromoCode() {
        const response = await applyPromoCode(promoCode.current.value);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        if (!response.ok) {
            return;
        }

        await updateCart();

        message.current = <span className={styles["code-message"]}>
            Successfully Added Promo Code <strong>&apos;{promoCode.current.value}&apos;!</strong>
        </span>;
        promoCode.current.value = "";
    }

    useEffect(() => {
        message.current = "";
    }, [message]);

    return <>
        <div className="d-flex justify-content-end align-items-center mb-4">
            {message && message.current}
        </div>
        <div className="d-flex justify-content-end align-items-center mb-4">
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
    </>
}