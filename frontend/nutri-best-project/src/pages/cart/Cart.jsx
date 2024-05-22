import styles from "./css/Cart.module.css";
import CartItemCounter from "../../components/Modals/Cart/CartItemCounter";
import { getPrice } from "../../utils/product/products";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);

    return <motion.div
        className={`${styles["cart-modal"]} container-fluid d-flex flex-column justify-content-center align-items-evenly mt-3`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="m-0 d-flex mb-3 ms-3">Your Cart</h2>
        {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(x => <div key={x.productId} className={`d-flex flex-sm-row flex-column justify-content-between align-items-md-center align-items-start`}>
            <Link className={`${styles["product-cart-item"]} ${styles["cart-item"]}`} to={`/products/details/${x.product.productId}/${x.product.name}`}>
                <hr className={`${styles["product-cart-line"]}`} />
                <div className="d-flex justify-content-start align-items-center m-1">
                    <img className={styles["cart-image"]} src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt={x.product.name} />

                    <div className="ms-2">
                        <h5 className={`mb-0 ${styles["product-name"]}`}>{x.product.name}</h5>
                    </div>
                </div>
            </Link>
            <div className="d-flex justify-content-between align-items-center">
                <CartItemCounter key={x.count} styles={styles} product={x.product} count={x.count} />
                <h5 className={`${styles["item-price"]} text-italic d-flex justify-content-center align-items-center`}>
                    {x.product.promotionId ?
                        getPrice(x.product.price, x.product.discountPercentage).toFixed(2) :
                        x.product.price.toFixed(2)} BGN
                </h5>
            </div>
        </div>

        )}
        <hr className="m-1" />
        <h3 className="ms-2 d-flex align-items-end justify-content-center">
            Total: {cart && cart.totalPrice && cart.totalPrice.toFixed(2)} BGN
        </h3>
        <hr className="m-1" />
    </motion.div>
}