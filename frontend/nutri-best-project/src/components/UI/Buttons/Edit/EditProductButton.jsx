import styles from "../../../../pages/products/css/ProductItem.module.css";
import table from "../../../../pages/css/Table.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function EditProductButton({ productId, isTable = false }) {
    if (isTable) {
        return <>
            <Link to={`/products/edit/${productId}`} className={`${table["btn"]} ${table["edit"]} me-1 mb-1`}>Edit</Link>
        </>;
    }

    return <div className="col-6 d-flex justify-content-center mb-1">
        <Link to={`/products/edit/${productId}`} className={styles["edit-btn"]}>Edit</Link>
    </div>
}
