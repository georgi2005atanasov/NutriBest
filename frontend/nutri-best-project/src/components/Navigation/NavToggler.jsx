import colors from "../../App.module.css";
import styles from "./MainNavigation.module.css";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function NavToggler() {
    const token = useLoaderData("rootLoader");
    const { isAdmin, isEmployee } = useAuth(token); // employee also

    return <div className="col-md-6 p-0">
        <div className="container p-1">
            <div className="row">
                <div className="col-md-12">
                    <div className={`${styles["menu"]} d-flex justify-content-end align-items-start`}>
                        <input type="checkbox" id={`${styles["check"]}`} />
                        <label htmlFor={styles["check"]} className={`d-flex justify-content-center align-items-center ${styles["button"]} ${isAdmin ? colors["admin-color"] : colors["user-color"]}`}>
                            {isAdmin || isEmployee ? <i className="fa fa-cogs d-flex" aria-hidden="true"></i> : <>
                                <span></span>
                            </>}

                        </label>
                        <nav>
                            <a className={`${isAdmin ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? `/orders` : `/`}>
                                {!isAdmin ? "Home" : "Orders"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href="/products/all">
                                {!isAdmin ? "Products" : "Report"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/profiles" : "/info"} >
                                {!isAdmin || isEmployee ? "About us" : "Clients"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/promotions" : "/contact"}>
                                {isAdmin || isEmployee ? "Promotions" : "Contact us"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href="/categories">
                                {"Categories"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href="/brands">
                                {"Brands"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/more" : "/products/all?page=1"}>
                                {"More..."}
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div >
}