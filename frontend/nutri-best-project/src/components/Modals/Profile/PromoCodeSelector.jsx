/* eslint-disable react/prop-types */
import { useNavigation, useSubmit } from "react-router-dom";
import { sendPromoCode } from "../../../../../../backend/api/api";
import styles from "./css/PromoCodeSelector.module.css";
import { useState } from "react";

const PromoCodeSelector = ({ promoCodes, email }) => {
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const submit = useSubmit();

    const handlePromoChange = (event) => {
        setSelectedPromo(event.target.value);
    };

    async function handleSendCode() {
        if (!selectedPromo) {
            return;
        }

        setIsLoading(true);
        const response = await sendPromoCode(email, promoCodes[selectedPromo].description);

        const data = await response.json();

        if (!response.ok) {
            if (data.message) {
                setIsLoading(false);
                return submit(`message=${data.message}&type=danger`, {
                    action: "/profiles",
                    method: "GET"
                });
            }

            setIsLoading(false);
            return submit(`message=Something Went Wrong!&type=danger`, {
                action: "/profiles",
                method: "GET"
            });
        }

        setIsLoading(false);
        return submit(`message=${data.message}&type=success`, {
            action: "/profiles",
            method: "GET"
        });
    }

    return (<>
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <h2>Select Your Promo Code</h2>
            </div>
            <div className={styles["promoCodeContainer"]}>
                {promoCodes && promoCodes.map((x, index) => (
                    <div className={styles["promoCode"]} key={x.description}>
                        <input
                            type="radio"
                            name="promocode"
                            value={index}
                            id={`promo${index}`}
                            onChange={handlePromoChange}
                        />
                        <label htmlFor={`promo${index}`}>
                            {x.description} - {x.expireIn} days left
                        </label>
                    </div>
                ))}
            </div>
            <button className={styles["button"]} onClick={handleSendCode}>
                {isLoading ? "Sending..." : "Send Code"}
            </button>
        </div>
    </>
    );
};

export default PromoCodeSelector;