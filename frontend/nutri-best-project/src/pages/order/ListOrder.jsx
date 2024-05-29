import listStyles from "./css/ListOrder.module.css";
import cartStyles from "../cart/css/Cart.module.css";
import { CartContext } from "../../store/CartContext";
import CartSummary from "../cart/CartSummary";
import { removeFromCart, getCart, getImageByProductId } from "../../../../../backend/api/api";
import { useContext, useCallback } from "react";
import ListItem from "./ListItem";

export default function ListOrder() {
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

    return <>
        <div className={`${listStyles["list-order"]}`}>
            {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(item =>
                <ListItem
                    key={`${item.productId}-${item.flavour}-${item.grams}`}
                    styles={cartStyles}
                    cartItem={item}
                    removeProduct={removeProduct} />
            )}

        <CartSummary cart={cart} />
        </div>
    </>
}