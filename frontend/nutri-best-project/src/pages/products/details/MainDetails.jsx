import styles from "./css/MainDetails.module.css";
import { setProductDetailsById } from "../../../../../../backend/api/products";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useSubmit } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function MainDetails({ product, isVerified }) {
    const servingSize = useRef("");
    const [isChangingServing, setIsChangingServing] = useState(false);
    const submit = useSubmit();

    const handleServingSize = () => {
        setIsChangingServing(prev => !prev);
        return submit(null); // used for automatic refresh
    }

    async function handleSaveServingSize() {
        const data = new FormData();

        data.set("servingSize", servingSize.current.value);
        await setProductDetailsById(product.productId, data);

        handleServingSize();
    }


    return <>
        <h5 className="mt-4">{product.name}</h5>
        <hr className="m-1" />
        <div className="ms-3">Related Categories: <strong>{product.categories.join(", ")}</strong></div>
        <hr className="m-1" />
        <div className="ms-3">Manufacturer: <strong>{product.brand}</strong></div>
        <hr className="m-1" />
        <div className="ms-3 d-flex align-items-center">
            Serving Size:&nbsp; <strong>{product.servingSize}</strong>
            {isVerified && isChangingServing &&
                <motion.input
                    ref={servingSize}
                    className={`w-25 ms-3 border-0 ${styles["serving-size-input"]}`}
                    type="text"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.7 }}
                />}
            {isVerified &&
                <button
                    className={`border-0 px-4 py-2 ms-3 ${isChangingServing && styles["save-btn"]}`}
                    type="button"
                    onClick={!isChangingServing ? handleServingSize : handleSaveServingSize}
                >
                    {!isChangingServing ? "Edit" : "Save"}
                </button>}
        </div>
        <hr className="m-1" />
    </>
}