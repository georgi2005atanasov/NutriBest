/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import colors from "../../App.module.css";
import NavigationLink from "../Navigation/NavigationLink";
import { motion } from "framer-motion";

export default function UserButtons({ styles, isAdmin, handleLogout, shoppingBag }) {
    return <>
        <motion.div
            className="row my-2 p-0 d-flex justify-content-end align-items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="col-6 p-0 d-flex justify-content-end align-items-center me-1">
                {isAdmin ? <>
                    <div className="mx-1"></div>

                    <NavigationLink
                        route={"/products/add"}
                        text={"Add Product"}
                        isAdmin={isAdmin}
                        className={`d-flex justify-content-center align-items-center p-md-1`} />
                </> :
                    undefined}
            </div>
        </motion.div>
        <motion.div
            className={`row d-flex justify-content-end p-0 ps-5 mt-0`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className={`col-12 p-0 d-flex justify-content-end`}>
                <div className="row d-flex justify-content-end">
                    <div className="col-lg-12 col-8 d-flex justify-content-end p-0 me-2">
                        {/* gotta add more tools buttons for admin soon */}
                        <NavigationLink
                            route={`/products/all?page=1`}
                            text={"All"}
                            isAdmin={isAdmin}
                            className={`text-center`} />

                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/profile"}
                            text={"Profile"}
                            isAdmin={isAdmin}
                            className={`text-center p-md-1`} />
                        <div className="mx-1"></div>

                        <NavigationLink
                            text={"Logout"}
                            onClick={handleLogout}
                            isAdmin={isAdmin}
                            className={`text-center border-0 p-md-1`} />

                        <div className="mx-1"></div>

                        {!isAdmin ?
                            <div id={styles["shopping-cart-wrapper"]} className={isAdmin ? `px-2 p-lg-4 ${styles["nav-link"]} ${colors["admin-color"]}` : `${colors["user-color"]} ${styles["nav-link"]} px-2 p-lg-4 mx-1`}>
                                <Link className="text-center" to="cart-modal">
                                    <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                                </Link>
                            </div> :
                            undefined}
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}