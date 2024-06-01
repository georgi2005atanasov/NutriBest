import styles from "./css/FinishedOrder.module.css";
import ListOrder from "./ListOrder";
import { getOrderById, getImageByProductId } from "../../../../../backend/api/api";
import { getDate } from "../../utils/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, redirect, useSearchParams } from "react-router-dom";

export default function FinishedOrder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
    const orderId = searchParams.get("orderId");

    console.log(order);

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
        <motion.div className="container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
        >
            <div className="row">
                <div className="col-md-12 mt-4">
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
                        <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                            <span className="mt-3 text-italic text-danger">Visit your email to check your order!</span>
                            <Link className={styles["home-button"]} to="/">Return to Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>

            {order.invoice && <div className="row">
                <div className="col-md-12 mt-4">
                    <div className={`${styles["confirmation-container"]}`}>
                        <h2>Invoice Details</h2>
                        <div className={styles["order-details"]}>
                            <p>
                                <strong>First Name:</strong> {order.invoice.firstName}
                            </p>
                            <p>
                                <strong>Last Name:</strong> {order.invoice.lastName}
                            </p>
                            <p>
                                <strong>Company Name:</strong> {order.invoice.companyName}
                            </p>
                            <p>
                                <strong>Person In Charge:</strong> {order.invoice.personInCharge}
                            </p>
                            <p>
                                <strong>Bullstat:</strong> {order.invoice.bullstat || "-"}
                            </p>
                            <p>
                                <strong>VAT:</strong> {order.invoice.VAT || "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>}

            <div className="row">
                <div className={`col-md-12 mt-4 justify-content-center d-flex flex-column`}>
                    <ListOrder passedCart={cart} />
                </div>
            </div>
        </motion.div>
    </>
}