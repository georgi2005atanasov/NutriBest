/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { useEffect, useState, } from "react";
import { getImageByProductId } from "../../../../../backend/api/products";
import { Link } from "react-router-dom";

export default function ProductRow({ product }) {
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

    return <tr>
        <td><img src={src} alt="Product"></img></td>
        <td>{product.productId}</td>
        <td>{Number(product.price.toFixed(2)) + 0.99} BGN</td>
        <td>{product.name}</td>
        <td>
            <Link to={`/products/edit/${product.productId}`} className={`${styles["btn"]} ${styles["edit"]} me-1 mb-1`}>Edit</Link>
            <Link className={`${styles["btn"]} ${styles["delete"]} me-1 mb-1`}>Delete</Link>
            <Link to={`/products/details/${product.productId}`} className={`${styles["btn"]} ${styles["details"]} me-1`}>Details</Link>
        </td>
    </tr>
}