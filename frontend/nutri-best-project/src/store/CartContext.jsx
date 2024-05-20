import { getCart } from "../../../../backend/api/cart";
import { createContext, useEffect, useState } from "react";
import { getImageByProductId } from "../../../../backend/api/products";

export const CartContext = createContext({
    cart: {},
    setCart: () => { },
    setCurrentProducts: () => {}
});

// eslint-disable-next-line react/prop-types
export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState();

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

    useEffect(() => {
        getCartProducts();
    }, []);

    return <CartContext.Provider
        value={{ cart, setCart, setCurrentProducts: getCartProducts }}>
        {children}
    </CartContext.Provider>
}