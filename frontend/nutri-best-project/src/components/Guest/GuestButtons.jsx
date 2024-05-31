/* eslint-disable react/prop-types */
import colors from "../../App.module.css";
import { CartContext } from "../../store/CartContext";
import CartButton from "../Modals/Cart/CartButton";
import CartModal from "../Modals/Cart/CartModal";
import NavigationLink from "../Navigation/NavigationLink";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";

export default function GuestButtons({ styles }) {
    const dialog = useRef();
    const { cart } = useContext(CartContext);

    function openCart() {
        if (cart.cartProducts.length > 0) {
            dialog.current.open();
        }
    }

    return <>
        <CartModal ref={dialog} />

        <motion.div
            className={`row d-flex justify-content-end mt-2 p-0 ps-5`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className={`col-12 p-0 d-flex justify-content-end me-0`}>
                <div className="row d-flex justify-content-end">
                    <div className={`${styles["nav-buttons"]} col-lg-12 d-flex justify-content-end p-0 me-sm-2`}>
                        <NavigationLink
                            route={"/products/all?page=1"}
                            text={"All"}
                            className="text-center" />

                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/login"}
                            text={"Log in"}
                            className="text-center" />

                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/register"}
                            text={"Sign up"}
                            className="text-center" />

                        <CartButton openCart={openCart} />
                    </div>
                </div>
            </div>
        </motion.div>
    </>;
}