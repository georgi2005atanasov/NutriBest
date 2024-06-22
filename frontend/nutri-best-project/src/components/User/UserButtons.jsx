/* eslint-disable react/prop-types */
import CartModal from "../UI/Modals/Cart/CartModal";
import CartButton from "../UI/Buttons/Cart/CartButton";
import NavigationLink from "../Navigation/NavigationLink";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import { CartContext } from "../../store/CartContext";
import { motion } from "framer-motion";
import { allPackages, allFlavours } from "../../../../../backend/api/api";
import { useContext, useRef } from "react";

export default function UserButtons({ isVerified, handleLogout }) {
    const dialog = useRef();

    const { setPackages, setFlavours } = useContext(ProductSpecsContext);
    const { cart } = useContext(CartContext);

    function openCart() {
        if (cart.cartProducts.length > 0) {
            dialog.current.open();
        }
    } // repeated in GuestButtons.jsx

    async function resetContext() {
        const responsePackage = await allPackages();
        const responseFlavours = await allFlavours();
        setPackages(responsePackage);
        setFlavours(responseFlavours);
    }

    return <>
        <CartModal ref={dialog} />

        <motion.div
            className="row my-2 p-0 d-flex justify-content-end align-items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="col-6 p-0 d-flex justify-content-end align-items-center me-1">
                {isVerified ? <>
                    <div className="mx-1"></div>

                    <NavigationLink
                        route={"/products/add"}
                        text={"Add Product"}
                        isAdmin={isVerified}
                        onClick={resetContext}
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
                    <div className={`col-lg-12 col-8 d-flex justify-content-end p-0 ${isVerified ? 'me-3' : 'me-0'}`}>
                        {/* gotta add more tools buttons for admin soon */}
                        <NavigationLink
                            route={`/products/all?page=1`}
                            text={"All"}
                            isAdmin={isVerified}
                            className={`text-center`} />

                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/profile"}
                            text={"Profile"}
                            isAdmin={isVerified}
                            className={`text-center p-md-1`} />
                        <div className="mx-1"></div>

                        <NavigationLink
                            text={"Logout"}
                            onClick={handleLogout}
                            isAdmin={isVerified}
                            className={`text-center border-0 p-md-1`} />

                        {!isVerified ?
                            <CartButton openCart={openCart} /> :
                            undefined}
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}