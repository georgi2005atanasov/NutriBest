/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import shoppingBag from "../assets/shopping-bag.png";

export default function NavButtons({ styles }) {
    return <div className={`row d-flex justify-content-end mt-2 p-0 ps-5`}>
        <div className={`${styles["nav-buttons"]} col-12 p-0 d-flex justify-content-end`}>
            <div className="row d-flex justify-content-end">
                <div className="col-lg-12 d-flex justify-content-end p-0 me-2">
                    <div className={`${styles["nav-link"]} mx-1`}>
                        <Link className="text-center" to="/login">Log in</Link>
                    </div>
                    <div className={`${styles["nav-link"]}`}>
                        <Link className="text-center" to="/register">Sign up</Link>
                    </div>
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