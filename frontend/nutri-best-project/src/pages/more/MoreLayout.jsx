import styles from "./css/MoreLayout.module.css";
import NavigationLink from "../../components/Navigation/NavigationLink";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

export default function MoreLayout() {
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    return <>
        <motion.div
            className="container mt-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            {(isAdmin || isEmployee) &&
                <div className="row d-flex justify-content-center">
                    <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                        <NavigationLink
                            route={`/packages`}
                            text={"Packages"}
                            isAdmin={true}
                            className={`${styles["item"]} text-center p-5`} />
                    </div>
                    <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                        <NavigationLink
                            route={`/flavours`}
                            text={"Flavours"}
                            isAdmin={true}
                            className={`${styles["item"]} text-center p-5`} />
                    </div>
                    <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                        <NavigationLink
                            route={`/promo-codes`}
                            text={"Promo Codes"}
                            isAdmin={true}
                            className={`${styles["item"]} text-center p-5`} />
                    </div>
                    <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                        <NavigationLink
                            route={`/shipping-discounts/all`}
                            text={"Shipping Discounts"}
                            isAdmin={true}
                            className={`${styles["item"]} text-center p-5`} />
                    </div>
                </div>
            }
            <div className="row d-flex justify-content-center">
                <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                    <NavigationLink
                        route={`/categories`}
                        text={"Categories"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
                <div className={`${styles["more-box"]} col-lg-3 d-flex justify-content-center mb-5`}>
                    <NavigationLink
                        route={`/brands`}
                        text={"Brands"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
            </div>
        </motion.div>
    </>;
}