/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function UserButtons({ styles, isAdmin, handleLogout, shoppingBag }) {
    return <div className={`row d-flex justify-content-end mt-2 p-0 ps-5`}>
        <div className={`${styles["nav-buttons"]} col-12 p-0 d-flex justify-content-end`}>
            <div className="row d-flex justify-content-end">
                <div className="col-lg-12 d-flex justify-content-end p-0 me-2">
                    {isAdmin ?
                        <div className={`${styles["nav-link"]}`}>
                            <Link className="text-center" to="/add">Add Product</Link>
                        </div> :
                        undefined}
                    <div className={`${styles["nav-link"]} mx-1`}>
                        {/* has to do job to make account page */}
                        <Link className="text-center" to="/account">Profile</Link>
                    </div>
                    <div className={`${styles["nav-link"]}`}>
                        <Link onClick={handleLogout} className="text-center border-0">Logout</Link>
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