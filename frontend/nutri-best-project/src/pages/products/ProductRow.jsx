/* eslint-disable react/prop-types */
import styles from "../css/Table.module.css";
import { useEffect, useState, } from "react";
import { getImageByProductId } from "../../../../../backend/api/products";
import { Link } from "react-router-dom";
import DeleteProductButton from "../../components/UI/Buttons/DeleteProductButton";
import EditProductButton from "../../components/UI/Buttons/EditProductButton";

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
        <td>{Number(product.price.toFixed(2))} BGN</td>
        <td>{product.name}</td>
        <td>
            <EditProductButton productId={product.productId} isTable={true} name={product.name} />
            <DeleteProductButton productId={product.productId} isTable={true} name={product.name} />
            <Link to={`/products/details/${product.productId}`} className={`${styles["btn"]} ${styles["details"]} me-1`}>Details</Link>
        </td>
    </tr>
}