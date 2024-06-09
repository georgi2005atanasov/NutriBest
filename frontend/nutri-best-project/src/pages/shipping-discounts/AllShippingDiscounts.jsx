import styles from "../css/Table.module.css";
import shippingStyles from "./css/AllShippingDiscounts.module.css";
import Message from "../../components/UI/Shared/Message";
import { allShippingDiscounts } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function AllShippingDiscounts() {
    const { data } = useLoaderData();
    let [searchParams, setSearchParams] = useSearchParams();

    let message = searchParams.get("message");
    let messageType = searchParams.get("type");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchParams(prev => {
                prev.delete("type");
                prev.delete("message");
                return prev;
            })
        }, 2500);

        return () => {
            clearTimeout(timeout);
        }
    }, [setSearchParams]);

    function handleDelete() {

    }

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-0 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        {/* <DeleteOrderModal ref={dialog} orderId={orderToDelete} /> */}
        <div className="mt-3 d-flex justify-content-start">
            <h2 className="mx-0 d-flex justify-content-center align-items-center">Shipping Discounts</h2>
        </div>
        <div className="row mt-md-4 mt-0">
            {message && <Message addStyles={"mb-3"} message={message} messageType={messageType} />}
            <table className="">
                <thead >
                    <tr>
                        <th>Country</th>
                        <th>Description</th>
                        <th>Discount Percentage</th>
                        <th>Minimum Price</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data && data.shippingDiscounts && data.shippingDiscounts.map((discount, index) =>
                        <motion.tr
                            key={index}
                            className={shippingStyles["table-row"]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <td>{discount.countryName}</td>
                            <td>{discount.description}</td>
                            <td>{discount.discountPercentage}%</td>
                            <td>{discount.minimumPrice ? `${discount.minimumPrice} BGN` : 'None'}</td>
                            <td>{discount.endDate ? new Date(discount.endDate).toLocaleString() : 'None'}</td>
                            <td>
                                <button
                                    className={shippingStyles["delete-btn"]}
                                    onClick={() => handleDelete(index)}>
                                    Delete
                                </button>
                            </td>
                        </motion.tr>)}
                </tbody>
            </table>
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    try {
        const data = await allShippingDiscounts();

        return {
            data
        }
    } catch (error) {
        return redirect("/?message=Page Not Found&type=danger");
    }
}