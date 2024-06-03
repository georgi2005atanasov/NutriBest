import styles from "./css/Cart.module.css";
import { getCart, removePromoCode } from "../../../../../backend/api/api";
import { removeFromCart } from "../../../../../backend/api/api";
import { getImageByProductId } from "../../../../../backend/api/api";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import PromoCodeField from "./PromoCodeField";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";

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

    async function handleCodeRemove() {
        const response = await removePromoCode(cart.code);

        if (!response.ok) {
            return;
        }

        await getCartProducts();
    }

    return <motion.div
        className={`${styles["cart-modal"]} container-fluid d-flex flex-column justify-content-center align-items-evenly mt-3`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        <h2 className="m-0 d-flex mb-3 ms-3">Your Cart</h2>
        {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(item =>
            <CartItem
                key={`${item.productId}-${item.flavour}-${item.grams}`}
                styles={styles}
                cartItem={item}
                removeProduct={removeProduct} />
        )}
        <hr className="m-0 mb-4" />

        <PromoCodeField updateCart={getCartProducts} />

        <CartSummary cart={cart} handleCodeRemove={handleCodeRemove} />

        {cart && cart.cartProducts && cart.cartProducts.length > 0 && <Link onClick={() => {
            window.scrollTo({
                top: 450,
                left: 0,
                behavior: 'smooth'
            });
        }} to={`/order`} className={styles["make-order"]}>
            Make Order
        </Link>}
    </motion.div>
}