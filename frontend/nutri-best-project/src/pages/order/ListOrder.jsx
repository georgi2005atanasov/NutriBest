import listStyles from "./css/ListOrder.module.css";
import cartStyles from "../cart/css/Cart.module.css";
import { CartContext } from "../../store/CartContext";
import CartSummary from "../cart/CartSummary";
import { useContext } from "react";
import ListItem from "./ListItem";

export default function ListOrder() {
    const { cart, setCart } = useContext(CartContext);

    return <>
        <CartSummary cart={cart} />
        <div className={`${listStyles["list-order"]} card py-2 mt-md-0 mt-3`}>
            {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(item =>
                <ListItem
                    key={`${item.productId}-${item.flavour}-${item.grams}`}
                    styles={cartStyles}
                    cartItem={item} />
            )}

        </div>
    </>
}