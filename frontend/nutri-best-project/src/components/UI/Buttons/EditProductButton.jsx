import styles from "../../../pages/css/ProductItem.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function EditProductButton({ productId }) {
    return <div className="col-6 d-flex justify-content-center mb-1">
        <Link to={`/products/edit/${productId}`} className={styles["edit-btn"]}>Edit</Link>
    </div>
}
