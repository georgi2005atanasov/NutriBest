/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import promotionStyles from "./css/ProductItem.module.css";
import { getImageByProductId } from "../../../../../backend/api/products";
import DeleteProductButton from "../../components/UI/Buttons/Products/DeleteProductButton";
import EditProductButton from "../../components/UI/Buttons/Products/EditProductButton";
import MultiSelectPromotion from "../../components/UI/Promotions/MultiSelectPromotion";
import { getPrice } from "../../utils/product/products";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductRow({ product, promotions }) {
    const [src, setSrc] = useState('');

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
    }, [product])

    if (promotions
        .filter(x => x.isActive)
        .some(x => x.promotionId == product.promotionId)) {
        return <AnimatePresence>
            <motion.tr
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.9 }}>
                <td><img src={src} alt="Product"></img></td>
                <td>{product.productId}</td>
                <td>
                    <div className="d-flex flex-column">
                        <span>{getPrice(product.price, product.discountPercentage).toFixed(2)} BGN</span>
                        <span className={`${promotionStyles["original-price"]} pe-3`}>{Number(product.price.toFixed(2))} BGN</span>
                    </div>
                </td>
                <td>{product.quantity}</td>
                <td>{product.name}</td>
                <td>
                    <MultiSelectPromotion productId={product.productId} promotionId={product.promotionId} />
                    <div className="mb-3"></div>
                    <EditProductButton productId={product.productId} isTable={true} />
                    <DeleteProductButton productId={product.productId} isTable={true} />
                    <Link to={`/products/details/${product.productId}/${product.name}`} className={`${styles["btn"]} ${styles["details"]} me-1`}>Details</Link>
                </td>
            </motion.tr>
        </AnimatePresence>

    }

    return <tr>
        <td><img src={src} alt="Product"></img></td>
        <td>{product.productId}</td>
        <td>{Number(product.price.toFixed(2))} BGN</td>
        <td>{product.quantity}</td>
        <td>{product.name}</td>
        <td>
            <MultiSelectPromotion productId={product.productId} promotionId={product.promotionId} />
            <div className="mb-3"></div>
            <EditProductButton productId={product.productId} isTable={true} name={product.name} />
            <DeleteProductButton productId={product.productId} isTable={true} name={product.name} />
            <Link to={`/products/details/${product.productId}/${product.name}`} className={`${styles["btn"]} ${styles["details"]} me-1`}>Details</Link>
        </td>
    </tr>
}