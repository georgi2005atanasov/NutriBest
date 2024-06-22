import styles from "../../../../pages/products/css/ProductItem.module.css";
import table from "../../../../pages/css/Table.module.css";
import DeleteProductModal from "../../../UI/Modals/Delete/DeleteProductModal";
import { Link } from "react-router-dom";
import { useRef } from "react";

// eslint-disable-next-line react/prop-types
export default function DeleteProductButton({ productId, isTable = false }) {
    const dialog = useRef();

    function handleDeleteClick() {
        dialog.current.open();
    }

    if (isTable) {
        return <>
            <DeleteProductModal ref={dialog} productId={productId} />
            <Link onClick={handleDeleteClick} className={`${table["btn"]} ${table["delete"]} me-1 mb-1`}>Delete</Link>
        </>;
    }

    return <>
        <DeleteProductModal ref={dialog} productId={productId} />

        <div className="col-6 d-flex justify-content-center mb-1">
            <Link onClick={handleDeleteClick} className={styles["delete-btn"]}>Delete</Link>
        </div>
    </>;
}