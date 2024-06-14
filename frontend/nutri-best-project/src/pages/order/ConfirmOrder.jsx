/* eslint-disable no-constant-condition */
import styles from "./css/FinishedOrder.module.css";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmOrder } from "../../../../../backend/api/orders";
import { sendConfirmedOrderToAdmin } from "../../../../../backend/api/email";

export default function ConfirmOrder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState();

    const orderId = searchParams.get("orderId");

    useEffect(() => {
        async function handleConfirmation() {
            const response = await confirmOrder(orderId);

            if (!response.ok) {
                const { message } = await response.json();
                setError(message);
                return;
            }

            const { hasUpdated } = await response.json();

            if (hasUpdated) {
                const emailRes = await sendConfirmedOrderToAdmin(orderId, `http://localhost:5173/order/finished?orderId=${orderId}`);
            }
        }

        handleConfirmation();
    }, [orderId]);

    if (error) {
        return <>
            <h3 className={`${styles["error-confirm"]} mt-4 text-center`}>{error}</h3>
            <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
            </div>
        </>
    }

    return <>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="mt-4 d-flex justify-content-center align-items-center w-50 p-3 card">
                You Successfully Confirmed Order #000000{orderId}!
            </h5>
            <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
            </div>
        </div>
    </>
}