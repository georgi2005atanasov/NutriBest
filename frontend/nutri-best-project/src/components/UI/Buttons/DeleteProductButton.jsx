import { useRef, useState } from "react";
import styles from "../../../pages/css/ProductItem.module.css";
import { Link } from "react-router-dom";
import Modal from "../../Modals/Modal";
import DeleteProductModal from "../../Modals/DeleteProductModal";

// eslint-disable-next-line react/prop-types
export default function DeleteProductButton({ productId }) {
    const dialog = useRef();

    function handleDeleteClick() {
        dialog.current.open();
    }

    return <>
        <DeleteProductModal ref={dialog} />

        <div className="col-6 d-flex justify-content-center mb-1">
            <Link onClick={handleDeleteClick} className={styles["delete-btn"]}>Delete</Link>
        </div>
    </>;
}