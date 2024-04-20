/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import ProductRow from "./ProductRow";

export default function Table({ productsRows }) {
    const products = productsRows.flat();
    
    return <div className={`container ${styles["table-wrapper"]} mb-4`}>
        <div className="row mt-2">
            <table className="">
                <thead >
                    <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products && products.map(p => <ProductRow key={`${p.productId}-${p.name}`} product={p} />)}
                </tbody>
            </table>
        </div>
    </div>

}