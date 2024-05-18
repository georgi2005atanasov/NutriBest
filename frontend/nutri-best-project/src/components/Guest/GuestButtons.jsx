/* eslint-disable react/prop-types */
import colors from "../../App.module.css";
import NavigationLink from "../Navigation/NavigationLink";
import { motion } from "framer-motion";
import { useRef } from "react";
import CartModal from "../Modals/Cart/CartModal";

export default function GuestButtons({ styles, shoppingBag }) {
    const dialog = useRef();

    function openCart() {
        dialog.current.open();
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
            <div className={`${styles["nav-buttons"]} col-12 p-0 d-flex justify-content-end me-0`}>
                <div className="row d-flex justify-content-end">
                    <div className="col-lg-12 d-flex justify-content-end p-0 me-sm-2">
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

                        <div
                            onClick={openCart}
                            id={styles["shopping-cart-wrapper"]}
                            className={`${colors["user-color"]} 
                        ${styles["nav-link"]} px-2 p-lg-4 mx-1`}>
                            <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </>;
}