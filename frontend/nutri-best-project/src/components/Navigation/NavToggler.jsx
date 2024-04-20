import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import colors from "../../App.module.css";

/* eslint-disable react/prop-types */
export default function NavToggler({ styles }) {
    const token = useLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    return <div className="col-10 p-0">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={`${styles["menu"]} d-flex justify-content-end align-items-center`}>
                        <input type="checkbox" id={styles["check"]} />
                        <label htmlFor={styles["check"]} className={`${styles["button"]} ${isAdmin ? colors["admin-color"] : colors["user-color"]}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                        <nav>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/">Home</a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/login">Products</a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/info">About us</a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/contact">Contact</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
}