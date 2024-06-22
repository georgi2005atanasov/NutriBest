/* eslint-disable react/prop-types */
import CartItemCounter from "../../components/UI/Modals/Cart/CartItemCounter";
import { getPrice } from "../../utils/product/products";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CartItem({styles, cartItem, removeProduct}) {
    return <motion.div
        key={`${cartItem.productId}-${cartItem.flavour}-${cartItem.grams}`}
        className={`position-relative d-flex flex-sm-row flex-column justify-content-between align-items-sm-center align-items-start m-3`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
    >
        {cartItem.product.discountPercentage &&
            <div className={styles["promotion-box"]}>
                {Math.floor(cartItem.product.discountPercentage)} <strong>%</strong>
            </div>}

        <Link className={`${styles["product-cart-item"]} ${styles["cart-item"]} w-50`} to={`/products/details/${cartItem.product.productId}/${cartItem.product.name}`}>
            <hr className={`${styles["product-cart-line"]}`} />
            <div className="d-flex justify-content-start align-items-center m-1">
                <img className={styles["cart-image"]} src={`data:${cartItem.product.image.contentType};base64,${cartItem.product.image.imageData}`} alt={cartItem.product.name} />

                <div className="ms-2">
                    <h5 className={`mt-md-0 mt-4 mb-0 ${styles["product-name"]}`}>{cartItem.product.name} - {cartItem.flavour} {cartItem.grams}g</h5>
                </div>
            </div>
        </Link>

        <div className={`d-flex justify-content-between align-items-center w-50`}>
            <CartItemCounter
                key={cartItem.count} // be aware!
                styles={styles}
                product={cartItem.product}
                count={cartItem.count}
                flavour={cartItem.flavour}
                grams={cartItem.grams} />

            <h3 className={`${styles["item-price"]} text-italic d-flex justify-content-center align-items-center`}>
                {cartItem.product.promotionId ?
                    getPrice(cartItem.price, cartItem.product.discountPercentage).toFixed(2) :
                    cartItem.price.toFixed(2)} BGN
            </h3>
        </div>

        <motion.i
            onClick={(event) => removeProduct(event, cartItem.productId, cartItem.count, cartItem.flavour, cartItem.grams)} className={`fa fa-trash-o ${styles["delete-icon"]}`} aria-hidden="true"
        >
        </motion.i>
    </motion.div>
}