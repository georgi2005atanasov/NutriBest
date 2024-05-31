import { useEffect, useState } from "react";
import styles from "./css/FinishedOrder.module.css";
import { Link, redirect, useSearchParams, useSubmit } from "react-router-dom";
import { getOrderById, getImageByProductId } from "../../../../../backend/api/api";
import { getDate } from "../../utils/utils";
import ListOrder from "./ListOrder";

export default function FinishedOrder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
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

    useEffect(() => {
        async function storeImages() {
            const imagePromises = order.cart.cartProducts.map(async (p) => {
                p.product.image = await getImageByProductId(p.productId);
            });

            await Promise.all(imagePromises);
            setCart(order.cart);
        }

        if (order.cart) {
            storeImages();
        }
    }, [order]);

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-4">
                    <div className={`${styles["confirmation-container"]}`}>
                        <h2>Thank you for your order!</h2>
                        <div className={styles["order-details"]}>
                            <p><strong>Order Number:</strong> #{orderId}</p>
                            <p>
                                <strong>Confirmed:</strong>&nbsp;
                                {order.isConfirmed ?
                                    <span className="text-success">Yes</span> :
                                    <span className="text-danger">No</span>}
                            </p>
                            <p>
                                <strong>Finished:</strong>&nbsp;
                                {order.isFinished ?
                                    <span className="text-success">Yes</span> :
                                    <span className="text-danger">No</span>}
                            </p>
                            <p><strong>Payment Method:</strong> Credit Card</p>
                            <p><strong>Order Date:</strong> {getDate(order.madeOn)}</p>
                        </div>
                        <div className="m-auto d-flex justify-content-center">
                            <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <ListOrder passedCart={cart} />
                </div>
            </div>
        </div>
    </>
}