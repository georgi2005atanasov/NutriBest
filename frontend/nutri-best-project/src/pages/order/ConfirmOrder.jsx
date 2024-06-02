import styles from "./css/FinishedOrder.module.css";
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmOrder } from "../../../../../backend/api/orders";

export default function ConfirmOrder() {
    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");

    useEffect(() => {
        async function handleConfirmation() {
            await confirmOrder(orderId);
        }

        handleConfirmation();
    }, [orderId]);

    return <>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="mt-4 d-flex justify-content-center align-items-center w-50 p-3 card">
                You Successfully Confirmed Order #000000{orderId}!
            </h5>
            <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                <Link className={styles["home-button"]} to={`/order/finished?orderId=${orderId}`}>View Order</Link>
            </div>
            <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
            </div>
        </div>
    </>
}