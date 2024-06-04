/* eslint-disable react/prop-types */
import listStyles from "./css/ListOrder.module.css";
import { getPrice } from "../../utils/product/products";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ListItem({ styles, cartItem }) {
    return <motion.div
        key={`${cartItem.productId}-${cartItem.flavour}-${cartItem.grams}`}
        className={`card position-relative d-flex flex-sm-row flex-column justify-content-between align-items-sm-center align-items-start m-3 mt-0`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
    >
        {cartItem.product.discountPercentage &&
            <div className={listStyles["promo-box"]}>
                {Math.floor(cartItem.product.discountPercentage)}<strong>%</strong>
            </div>}
        <Link className={`${styles["product-cart-item"]} w-50`} to={`/products/details/${cartItem.product.productId}/${cartItem.product.name}`}>
            <div className="d-flex justify-content-start align-items-center m-1">
                <img className={styles["cart-image"]} src={`data:${cartItem.product.image && cartItem.product.image.contentType};base64,${cartItem.product.image && cartItem.product.image.imageData}`} alt={cartItem.product.name} />

                <div className="ms-2">
                    <h6 className={`mt-md-0 mt-4 mb-0 ${styles["product-name"]}`}>{cartItem.product.name} - {cartItem.flavour} {cartItem.grams}g</h6>
                </div>
            </div>
        </Link>

        <div className={`d-flex justify-content-between align-items-center w-50`}>
            <h6 className={`${styles["item-price"]} text-italic d-flex justify-content-end align-items-center`}>
                {cartItem.product.promotionId ?
                    getPrice(cartItem.price, cartItem.product.discountPercentage).toFixed(2) :
                    cartItem.price && cartItem.price.toFixed(2)} BGN&nbsp;
                <span className={`mb-5 
                        ${cartItem.product.promotionId ?
                        "text-danger" :
                        "text-secondary"}`}>
                    x{cartItem.count}
                </span>
            </h6>
        </div>
    </motion.div>
}