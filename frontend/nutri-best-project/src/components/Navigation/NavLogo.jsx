/* eslint-disable react/prop-types */
import styles from "./MainNavigation.module.css";
import { Link } from "react-router-dom"
import logo from "../../assets/another-nutri-best-logo.png";
import { motion } from "framer-motion";

export default function NavLogo() {
    return <motion.div
        className="col-2 p-1 d-flex justify-content-center align-items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
    >
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center me-md-4 ms-4 p-0">
                <div className="col-3 d-flex justify-content-md-center justify-content-start align-items-center offset-md-2 me-4">
                    <div id={styles["header-logo"]}>
                        <img className="m-auto w-100 d-flex-justify-content-center align-items-center" src={logo} alt="Logo" />
                    </div>
                </div>
                <div className="col-md-7 p-0 justify-content-start">
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