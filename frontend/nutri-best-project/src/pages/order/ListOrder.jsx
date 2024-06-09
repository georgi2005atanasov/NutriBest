/* eslint-disable react/prop-types */
import listStyles from "./css/ListOrder.module.css";
import cartStyles from "../cart/css/Cart.module.css";
import { CartContext } from "../../store/CartContext";
import CartSummary from "../cart/CartSummary";
import { useContext } from "react";
import ListItem from "./ListItem";

export default function ListOrder({ passedCart, shippingPrice, shippingPriceWithDiscount, minimumPrice }) {
    const { cart } = useContext(CartContext);

    console.log(shippingPriceWithDiscount);
    console.log(minimumPrice);

    if (passedCart) {
        return <>
            <CartSummary
                cart={passedCart}
                shippingPrice={(passedCart && minimumPrice <= passedCart.totalProducts) || !minimumPrice ?
                    shippingPriceWithDiscount :
                    shippingPrice} />
            <div className={`${listStyles["list-order"]} card pt-3 mt-md-0 mt-3`}>
                {passedCart && passedCart.cartProducts && passedCart.cartProducts.length > 0 && passedCart.cartProducts.map(item =>
                    <ListItem
                        key={`${item.productId}-${item.flavour}-${item.grams}`}
                        styles={cartStyles}
                        cartItem={item} />
                )}
            </div>
        </>
    }

    return <>
        <CartSummary
            cart={cart}
            shippingPrice={(cart && minimumPrice <= cart.totalProducts) || !minimumPrice ?
                shippingPriceWithDiscount :
                shippingPrice} />

        <div className={`${listStyles["list-order"]} card pt-3 mt-md-0 mt-3`}>
            {cart && cart.cartProducts && cart.cartProducts.length > 0 && cart.cartProducts.map(item =>
                <ListItem
                    key={`${item.productId}-${item.flavour}-${item.grams}`}
                    styles={cartStyles}
                    cartItem={item} />
            )}
        </div>
    </>
}