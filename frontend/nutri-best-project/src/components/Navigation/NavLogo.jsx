/* eslint-disable react/prop-types */
import styles from "./MainNavigation.module.css";
import logo from "../../assets/another-nutri-best-logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"

export default function NavLogo() {
    return <motion.div
        className="col-2 p-1 d-flex justify-content-center align-items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
    >
        <div className="container-fluid p-0">
            <div className="ms-sm-4 row d-flex justify-content-center align-items-center">
                <div className="col-4 d-flex justify-content-md-center justify-content-start align-items-center ms-md-5">
                    <div id={styles["header-logo"]}>
                        <img className="m-auto w-100 d-flex-justify-content-center align-items-center" src={logo} alt="Logo" />
                    </div>
                </div>
                <div className="ms-5 col-md-8 p-0 justify-content-start">
                    <div id="shop-name" className="d-flex justify-content-md-center justify-content-start align-items-center">
                        <h2 className="my-0">
                            <Link to="/" className="text-decoration-none text-black">NutriBest</Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
}