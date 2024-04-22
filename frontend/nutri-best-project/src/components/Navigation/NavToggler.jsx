import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import colors from "../../App.module.css";


/* eslint-disable react/prop-types */
export default function NavToggler({ styles }) {
    const token = useLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    return <div className="col-md-6 p-0">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className={`${styles["menu"]} d-flex justify-content-end align-items-start`}>
                        <input type="checkbox" id={styles["check"]} />
                        <label htmlFor={styles["check"]} className={`d-flex justify-content-center align-items-center ${styles["button"]} ${isAdmin ? colors["admin-color"] : colors["user-color"]}`}>
                            {isAdmin ? <i className="fa fa-cogs d-flex" aria-hidden="true"></i> : <>
                                <span></span>
                            </>}

                        </label>
                        <nav>
                            {/* gotta change the routes for admin panel. */}
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/">
                                {!isAdmin ? "Home" : "Orders"}
                            </a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/products/all">
                                {!isAdmin ? "Products" : "Report"}
                            </a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/info">
                                {!isAdmin ? "About us" : "Clients"}
                            </a>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href="/contact">
                                {!isAdmin ? "Offers" : "Offers"}
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
}