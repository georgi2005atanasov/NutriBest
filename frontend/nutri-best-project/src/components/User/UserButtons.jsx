/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import NavigationLink from "../Navigation/NavigationLink";
export default function UserButtons({ styles, isAdmin, handleLogout, shoppingBag }) {

    return <div className={`row d-flex justify-content-end mt-2 p-0 ps-5`}>
        <div className={`${styles["nav-buttons"]} col-12 p-0 d-flex justify-content-end`}>
            <div className="row d-flex justify-content-end">
                <div className="col-lg-12 d-flex justify-content-end p-0 me-2">
                    {/* gotta add more tools buttons for admin soon */}
                    <NavigationLink
                        route={"/products/all?page=1"}
                        text={"All"}
                        className="text-center" />

                    {isAdmin ? <>
                        <div className="mx-1"></div>

                        <NavigationLink
                            route={"/products/add"}
                            text={"Add Product"}
                            className="text-center" />
                    </> :
                        undefined}

                    <div className="mx-1"></div>

                    <NavigationLink
                        route={"/profile"}
                        text={"Profile"}
                        className="text-center" />
                    <div className="mx-1"></div>

                    <NavigationLink
                        text={"Logout"}
                        onClick={handleLogout}
                        className="text-center border-0" />

                    <div className={`${styles["nav-link"]} p-2 mx-1`}>
                        <Link className="text-center" to="cart-modal">
                            <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}