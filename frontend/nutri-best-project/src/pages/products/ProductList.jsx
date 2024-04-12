/* eslint-disable react/prop-types */
import styles from "../css/ProductList.module.css";

export default function ProductList({product, src}) {
    return <div className={styles["product-list"]}>
        <img className={styles["product-image"]} src={src} alt="Dynamic" />
        <div className="product-name text-center mb-3">
            {product.name}
        </div>
    </div>;
}