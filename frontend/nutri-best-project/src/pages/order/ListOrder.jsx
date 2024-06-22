/* eslint-disable react/prop-types */
import listStyles from "./css/ListOrder.module.css";
import cartStyles from "../cart/css/Cart.module.css";
import { CartContext } from "../../store/CartContext";
import CartSummary from "../../components/Cart/CartSummary";
import ListItem from "./ListItem";
import { useContext } from "react";

export default function ListOrder({ passedCart, shippingPrice, shippingPriceWithDiscount, minimumPrice }) {
    const { cart } = useContext(CartContext);

    if (passedCart) {
        const hasShippingDiscount = (passedCart && minimumPrice <= passedCart.totalProducts) || (passedCart && !minimumPrice);
        return <>
            <CartSummary
                cart={passedCart}
                shippingDiscount={hasShippingDiscount && shippingPrice - shippingPriceWithDiscount}
                shippingPrice={hasShippingDiscount ?
                    shippingPriceWithDiscount :
                    shippingPrice} />
            <div className={`${listStyles["list-order"]} card pt-3 mt-md-0 mt-3`}>
                {passedCart && passedCart.cartProducts && passedCart.cartProducts.length > 0 && passedCart.cartProducts.map(item =>
                    <ListItem
                        key={`${item.productId}-${item.flavour}-${item.grams}`}
                        styles={cartStyles}
                        cartItem={item} />)}
            </div>
        </>
    }

    const hasShippingDiscount = (cart && minimumPrice <= cart.totalProducts) || (cart && !minimumPrice);
    return <>
        <CartSummary
            cart={cart}
            shippingDiscount={hasShippingDiscount && shippingPrice - shippingPriceWithDiscount}
            shippingPrice={hasShippingDiscount ?
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