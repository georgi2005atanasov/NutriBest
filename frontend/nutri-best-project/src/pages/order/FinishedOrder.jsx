import styles from "./css/FinishedOrder.module.css";
import ListOrder from "./ListOrder";
import { getOrderById, getImageByProductId } from "../../../../../backend/api/api";
import { splitPascalCase } from "./OrderForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useSubmit } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { getOrderByAdmin } from "../../../../../backend/api/orders";

export default function FinishedOrder() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const [searchParams, setSearchParams] = useSearchParams();
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState([]);
    const submit = useSubmit();
    const orderId = searchParams.get("orderId");

    console.log(order);

    useEffect(() => {
        async function handleOrder() {
            let realId = Number(orderId);
            if (!isAdmin && !isEmployee) {
                const response = await getOrderById(realId);
                if (!response.ok) {
                    submit(null, { action: "/", method: "GET" });
                    return;
                }

                const orderToSet = await response.json();

                setOrder(orderToSet);
            } else {
                const response = await getOrderByAdmin(realId);
                if (!response.ok) {
                    submit(null, { action: "/", method: "GET" });
                    return;
                }

                const orderToSet = await response.json();

                setOrder(orderToSet);
            }
        }

        handleOrder();
    }, [orderId, submit, isEmployee, isAdmin]); // added isEmployee/isAdmin

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
                            <p><strong>Country:</strong> {order.country}, {order.city}</p>
                            <p><strong>Address:</strong> {order.street} {order.streetNumber}</p>
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
                            <p><strong>Payment Method:</strong> {splitPascalCase(order.paymentMethod ? [order.paymentMethod] : [])}</p>
                            <p><strong>Order Date:</strong> {new Date(order.madeOn).toLocaleDateString()}</p>
                            <p>
                                <strong>Is Paid:</strong>&nbsp;
                                <span className={order.isShipped ? "text-success" : "text-danger"}>
                                    {order.isPaid ? "Yes" : "No"}
                                </span>
                            </p>
                            <p>
                                <strong>Is Shipped:</strong>&nbsp;
                                <span className={order.isShipped ? "text-success" : "text-danger"}>
                                    {order.isShipped ? "Yes" : "No"}
                                </span>
                            </p>
                            {order.paymentMethod === "BankTransfer" && <div className="py-2 bg-light">
                                <h4>IBAN: {order.iban}</h4>
                                <h6>Reason: #{orderId}</h6>
                            </div>}
                        </div>
                        <div className="m-auto d-flex flex-column align-items-center justify-content-center">
                            <span className={`mt-3 text-italic ${!order.isConfirmed ? "text-danger" : "text-success"}`}>
                                {!order.isConfirmed ?
                                    `Visit ${order.email} to Confirm the Order!` :
                                    "Order Confirmed!"}
                            </span>
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
                    <ListOrder passedCart={cart} shippingPrice={order.shippingPrice} />
                </div>
            </div>
        </motion.div>
    </>
}