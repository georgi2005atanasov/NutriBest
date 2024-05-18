/* eslint-disable react/prop-types */
import NavigationLink from "../Navigation/NavigationLink";
import colors from "../../App.module.css";
import buttonsStyle from "./css/GuestButtons.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function GuestButtons({ styles, shoppingBag }) {
    const cart = useRef();

    function openCart() {

    }

    return <motion.div
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

                    <div id={styles["shopping-cart-wrapper"]} className={`${colors["user-color"]} ${styles["nav-link"]} px-2 p-lg-4 mx-1`}>
                        <Link className="text-center" onClick>
                            <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
}