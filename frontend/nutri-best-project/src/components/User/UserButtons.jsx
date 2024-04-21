/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import colors from "../../App.module.css";
import NavigationLink from "../Navigation/NavigationLink";
export default function UserButtons({ styles, isAdmin, handleLogout, shoppingBag }) {
    return <>
        <div className={`row d-flex justify-content-end p-0 ps-5 mt-lg-0 mt-2`}>
            <div className={`${styles["nav-buttons"]} col-12 p-0 d-flex justify-content-end`}>
                <div className="row d-flex justify-content-end">
                    <div className="col-lg-12 col-8 d-flex justify-content-end p-0 me-2">
                        {/* gotta add more tools buttons for admin soon */}
                        <NavigationLink
                            route={`/products/all?page=1`}
                            text={"All"}
                            isAdmin={isAdmin}
                            className={`text-center`} />

                        {isAdmin ? <>
                            <div className="mx-1"></div>

                            <NavigationLink
                                route={"/products/add"}
                                text={"Add Product"}
                                isAdmin={isAdmin}
                                className={`text-center`} />
                        </> :
                            undefined}

                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/profile"}
                            text={"Profile"}
                            isAdmin={isAdmin}
                            className={`text-center`} />
                        <div className="mx-1"></div>

                        <NavigationLink
                            text={"Logout"}
                            onClick={handleLogout}
                            isAdmin={isAdmin}
                            className={`text-center border-0`} />

                        <div className={isAdmin ? `px-2 p-lg-4 mx-1 ${styles["nav-link"]} ${colors["admin-color"]}` : `${colors["user-color"]} ${styles["nav-link"]} px-2 p-lg-4 mx-1`}>
                            <Link className="text-center" to="cart-modal">
                                <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}