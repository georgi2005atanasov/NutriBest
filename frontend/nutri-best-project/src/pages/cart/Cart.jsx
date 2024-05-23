import styles from "./css/Cart.module.css";
import CartItemCounter from "../../components/Modals/Cart/CartItemCounter";
import { getPrice } from "../../utils/product/products";
import { getCart } from "../../../../../backend/api/api";
import { removeFromCart } from "../../../../../backend/api/api";
import { getImageByProductId } from "../../../../../backend/api/api";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback, useContext } from "react";

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);

    const getCartProducts = useCallback(async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }, [setCart]);

    async function removeProduct(event, productId, count, flavour, grams) {
        await removeFromCart(productId, count, flavour, grams);
        await getCartProducts();
    }

    console.log(cart);
    return <motion.div
        className={`${styles["cart-modal"]} container-fluid d-flex flex-column justify-content-center align-items-evenly mt-3`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="m-0 d-flex mb-3 ms-3">Your Cart</h2>
        {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(x => <motion.div
            key={`${x.productId}-${x.flavour}-${x.grams}`}
            className={`position-relative d-flex flex-sm-row flex-column justify-content-between align-items-sm-center align-items-start m-3`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
        >
            {x.product.discountPercentage &&
                <div className={styles["promotion-box"]}>
                    {Math.floor(x.product.discountPercentage)} <strong>%</strong>
                </div>}

            <Link className={`${styles["product-cart-item"]} ${styles["cart-item"]} w-50`} to={`/products/details/${x.product.productId}/${x.product.name}`}>
                <hr className={`${styles["product-cart-line"]}`} />
                <div className="d-flex justify-content-start align-items-center m-1">
                    <img className={styles["cart-image"]} src={`data:${x.product.image.contentType};base64,${x.product.image.imageData}`} alt={x.product.name} />

                    <div className="ms-2">
                        <h5 className={`mt-md-0 mt-4 mb-0 ${styles["product-name"]}`}>{x.product.name} - {x.flavour} {x.grams}g</h5>
                    </div>
                </div>
            </Link>

            <div className={`d-flex justify-content-between align-items-center w-50`}>
                <CartItemCounter
                    key={x.count} // be aware!
                    styles={styles}
                    product={x.product}
                    count={x.count}
                    flavour={x.flavour}
                    grams={x.grams} />

                <h3 className={`${styles["item-price"]} text-italic d-flex justify-content-center align-items-center`}>
                    {x.product.promotionId ?
                        getPrice(x.product.price, x.product.discountPercentage).toFixed(2) :
                        x.product.price.toFixed(2)} BGN
                </h3>
            </div>

            <motion.i
                onClick={(event) => removeProduct(event, x.productId, x.count, x.flavour, x.grams)} className={`fa fa-trash-o ${styles["delete-icon"]}`} aria-hidden="true"
            >
            </motion.i>
        </motion.div>
        )}

        <hr className="m-0 mb-4" />
        <h2 className="ms-2 d-flex align-items-end justify-content-center">
            Total: {cart && cart.totalPrice && cart.totalPrice.toFixed(2)} BGN
        </h2>

    </motion.div>
}