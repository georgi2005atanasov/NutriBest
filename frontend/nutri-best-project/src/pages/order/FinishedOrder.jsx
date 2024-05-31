import { useEffect, useState } from "react";
import styles from "./css/FinishedOrder.module.css";
import { Link, redirect, useSearchParams } from "react-router-dom";
import { getOrderById } from "../../../../../backend/api/api";
import { getDate } from "../../utils/utils";

export default function FinishedOrder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState({});
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        async function handleOrder() {
            let realId = Number(orderId);
            const response = await getOrderById(realId);

            if (!response.ok) {
                return redirect("/error");
            }

            const orderToSet = await response.json();

            setOrder(orderToSet);
        }

        handleOrder();
    }, [orderId]);

    console.log(order);

    return <>
        <div className={`${styles["confirmation-container"]} mt-4`}>
            <h2>Thank you for your order!</h2>
            <div className={styles["order-details"]}>
                <p><strong>Order Number:</strong> #{orderId}</p>
                <p><strong>Confirmed:</strong> Yes</p>
                <p><strong>Finished:</strong> No</p>
                <p><strong>Payment Method:</strong> Credit Card</p>
                <p><strong>Order Date:</strong> {getDate(order.madeOn)}</p>
            </div>
        </div>
        <div className="m-auto d-flex justify-content-center">
            <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
        </div>
    </>
}