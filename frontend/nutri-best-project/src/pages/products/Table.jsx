/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import ProductRow from "./ProductRow";
import NavigationLink from "../../components/Navigation/NavigationLink";

export default function Table({ productsRows }) {
    const products = productsRows.flat();
    
    return <div className={`container ${styles["table-wrapper"]} mb-4`}>
        <div className="row">
            <div className="mb-3 d-flex justify-content-end">
                <NavigationLink
                    route={`/products/all?page=1`}
                    text={"View as User"}
                    className="text-center" />
                <div className="mx-1"></div>
            </div>
        </div>
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