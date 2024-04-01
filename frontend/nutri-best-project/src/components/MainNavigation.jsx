import logo from "../assets/another-nutri-best-logo.png";
import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom";

export default function MainNavigation() {
    return <div className={`container ${styles["main-navigation"]}`}>
        <div className="row d-flex justify-content-start align-items-center">
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
            <div className="col-10">
                <div className={`${styles["menu"]} d-flex justify-content-end`}>
                    <input type="checkbox" id={styles["check"]} />
                    <label htmlFor={styles["check"]} className={`${styles["button"]}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/info">About us</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </div>
            </div>
        </div>

    </div>;
}