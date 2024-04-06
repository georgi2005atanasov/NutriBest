import logo from "../assets/another-nutri-best-logo.png";
import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import NavButtons from "./NavButtons";

export default function MainNavigation() {
    return <div className={`container ${styles["main-navigation"]}`}>
        <div className="row d-flex justify-content-between align-items-start">
            <div className="col-2 d-flex">
                <div className="container">
                    <div className="row d-flex justify-content-around align-items-center">
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <div id={styles["header-logo"]}>
                                <img className="w-100 d-flex-justify-content-center align-items-center" src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="col-9 p-0 justify-content-start">
                            <div id="shop-name" className="d-flex justify-content-start align-items-center">
                                <h4 className="my-0">
                                    <Link to="/" className="text-decoration-none text-black">NutriBest</Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-10 p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={`${styles["menu"]} d-flex justify-content-end align-items-center`}>
                                <input type="checkbox" id={styles["check"]} />
                                <label htmlFor={styles["check"]} className={`${styles["button"]}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </label>
                                <nav>
                                    <a href="/">Home</a>
                                    <a href="/login">Products</a>
                                    <a href="/info">About us</a>
                                    <a href="/contact">Contact</a>
                                </nav>
                            </div>
                        </div>
                        <NavButtons styles={styles} />
                        {/* <div className="row d-flex justify-content-end mt-2 p-0 ps-5">
                            <div className="col-12 p-0 d-flex justify-content-end">
                                <div className="row d-flex justify-content-end">
                                    <div className="col-lg-12 d-flex justify-content-end p-0 me-2">
                                        <div className={`${styles["nav-link"]} mx-1`}>
                                            <Link to="/login">Log in</Link>
                                        </div>
                                        <div className={`${styles["nav-link"]}`}>
                                            <Link to="/register">Sign up</Link>
                                        </div>
                                        <div className={`${styles["nav-link"]} p-2 mx-1`}>
                                            <Link to="cart-modal">
                                                <img className={styles["cart-icon"]} src={shoppingBag} alt="Shopping bag" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    </div>;
}