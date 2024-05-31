import { useContext, useEffect } from "react";
import { Outlet, useSubmit } from "react-router-dom";
import { CartContext } from "../../store/CartContext";

export default function OrderLayout() {
    const { cart } = useContext(CartContext);
    const submit = useSubmit();

    useEffect(() => {
        if (cart && cart.cartProducts.length == 0) {
            submit("message=Your Cart is Empty!&type=danger", { action: "/", method: "GET" });
        }
    }, [cart, submit]);

    return <>
        <Outlet />
    </>;
}