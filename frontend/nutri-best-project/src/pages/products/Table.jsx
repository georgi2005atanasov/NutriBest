/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import ProductRow from "./ProductRow";
import { motion } from "framer-motion";

export default function Table({ productsRows }) {
    const products = (productsRows && productsRows.length && productsRows.length != 0)
        ? productsRows.flat() :
        [];

    return <motion.div
        className={`container ${styles["table-wrapper"]} mb-4`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.9 }}
    >
        <div className="row mt-2">
            <table className="">
                <thead >
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products && products.map(p => <ProductRow key={`${p.productId}-${p.name}`} product={p} />)}
                </tbody>
            </table>
        </div>
    </motion.div>

}