import colors from "../../App.module.css";
import styles from "./MainNavigation.module.css";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function NavToggler() {
    const token = useLoaderData("rootLoader");
    const { isAdmin, isEmployee, isUser } = useAuth(token); // employee also

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
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? `/orders` : `/`}>
                                {!isAdmin && !isEmployee ? "Home" : "Orders"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/notifications" : "/products/all"}>
                                {!isAdmin && !isEmployee ? "Products" : "Notifications"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/profiles" : "#about-us"} >
                                {!isAdmin && !isEmployee ? "About us" : "Clients"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={isAdmin || isEmployee ? "/promotions" : "/contact"}>
                                {!isAdmin && !isEmployee ? "Contact us" : "Promotions"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={`${isAdmin || isEmployee ? "/newsletter/list" : "/categories"}`}>
                                {!isAdmin && !isEmployee ? "Categories" : "Newsletter"}
                            </a>
                            <a className={`${isAdmin || isEmployee ? colors["admin-color"] : colors["user-color"]}`} href={`${isAdmin || isEmployee ? "/report/dashboard" : "/brands"}`}>
                                {!isAdmin && !isEmployee ? "Brands" : "Report"}
                            </a>
                            {isAdmin || isEmployee ?
                                <a className={`${colors["admin-color"]}`} href="/more">
                                    {"More..."}
                                </a> :
                                !isAdmin && !isEmployee && isUser ? <a className={`${colors["user-color"]}`} href="/my-orders">
                                    {"My orders"}
                                </a> :
                                    <a className={`${colors["user-color"]}`} href="/products/all?page=1">
                                        {"More..."}
                                    </a>}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div >
}