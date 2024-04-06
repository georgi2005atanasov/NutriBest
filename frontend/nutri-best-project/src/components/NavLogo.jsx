/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import logo from "../assets/another-nutri-best-logo.png";

export default function NavLogo({ styles }) {
    return <div className="col-2 d-flex">
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
}