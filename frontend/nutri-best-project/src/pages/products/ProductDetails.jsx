import styles from "./css/ProductDetails.module.css";
import { getProductDetailsByIdAndName } from "../../../../../backend/api/api";
import { getAuthToken } from "../../utils/auth";
import { getImageByProductId } from "../../../../../backend/api/api";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductDetailsPage() {
    const [src, setSrc] = useState("");
    const token = getAuthToken();
    const { isAdmin } = useAuth(token);
    const { product } = useLoaderData();

    useEffect(() => {
        async function getImage(productId) {
            const image = await getImageByProductId(productId);
            setSrc(`data:${image.contentType};base64,${image.imageData}`);
        }

        const src = localStorage.getItem(`image-${product.productId}`);

        if (!src) {
            getImage(product.productId);
            return;
        }

        setSrc(src);
    }, [product]);

    return <motion.div
        className="container d-flex flex-column mt-5 p-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        <header className="d-flex flex-column align-items-center align-items-lg-start m-0 p-0">
            <section className={`row w-100 offset-lg-1 col-lg-3 d-flex justify-content-lg-start justify-content-center m-auto p-0`}>
                <div className={`d-flex flex-column align-items-center align-items-lg-start`}>
                    <h3 className="mb-3">{product.name}</h3>
                    <img className={`${styles["details-image"]} card`} src={src} alt="" />
                </div>
                <div className="col-lg-8"></div>
            </section>
        </header>
    </motion.div>
}

export async function loader({ request, params }) {
    const { id, name } = params;

    const product = await getProductDetailsByIdAndName(id, name);

    return {
        product
    };
}