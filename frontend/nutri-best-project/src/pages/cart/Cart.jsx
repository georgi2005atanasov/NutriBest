import styles from "./css/Cart.module.css";
import { getCart } from "../../../../../backend/api/api";
import { removeFromCart } from "../../../../../backend/api/api";
import { getImageByProductId } from "../../../../../backend/api/api";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { useCallback, useContext } from "react";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";

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
        <CartSummary cart={cart} />
    </motion.div>
}