import styles from "../css/Table.module.css";
import shippingStyles from "./css/AllShippingDiscounts.module.css";
import Message from "../../components/UI/Shared/Message";
import DeleteShippingDiscountModal from "../../components/UI/Modals/Delete/DeleteShippingDiscountModal";
import DownloadCsvButton from "../../components/UI/Buttons/Download/DownloadCsvButton";
import { allShippingDiscounts, exportShippingDiscounts } from "../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NavigationLink from "../../components/Navigation/NavigationLink";

export default function AllShippingDiscounts() {
    const dialog = useRef();
    const { data } = useLoaderData();
    const [country, setCountry] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

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

    function handleDelete(countryName) {
        setCountry(countryName);
        dialog.current.open();
    }

    return <motion.div
        className={`container-fluid ${styles["table-wrapper"]} mb-4 mt-0 p-sm-4 p-1`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <DeleteShippingDiscountModal ref={dialog} countryName={country} />
        <div className="mt-3 d-flex justify-content-between align-items-center">
            <h2 className="mx-0 mb-0 d-flex justify-content-center align-items-center">Shipping Discounts</h2>
            <NavigationLink
                route="/shipping-discounts/add"
                text="Add Shopping Discount"
                isAdmin={true}
                className="p-2"
            />
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
                                    onClick={() => handleDelete(discount.countryName)}>
                                    Delete
                                </button>
                            </td>
                        </motion.tr>)}
                </tbody>
            </table>
            {data && data.shippingDiscounts && data.shippingDiscounts.length == 0 &&
                <h2 className="text-center mt-3">Currently There are no Shipping Discounts!</h2>}
        </div>
        <div className="w-100 text-end">
            <DownloadCsvButton
                fileName="shippingDiscounts"
                exportFunction={exportShippingDiscounts} />
        </div>
    </motion.div>
}

export async function loader({ request, params }) {
    try {
        const data = await allShippingDiscounts(true);

        if (data == null) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

        return {
            data
        }
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}