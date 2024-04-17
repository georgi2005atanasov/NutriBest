import { useState } from "react";
import styles from "../../../pages/css/ProductItem.module.css";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DeleteProductButton({ productId }) {
    // const [isDeleting, setIsDeleting] = useState(false);

    // if (isDeleting) {
    //     //show modal
    // }

    return <div className="col-6 d-flex justify-content-center mb-1">
        <Link to={`/products/delete/${productId}`} className={styles["delete-btn"]}>Delete</Link>
    </div>
}

