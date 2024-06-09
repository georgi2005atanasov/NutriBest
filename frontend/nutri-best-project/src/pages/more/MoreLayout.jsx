import styles from "./css/MoreLayout.module.css";
import NavigationLink from "../../components/Navigation/NavigationLink";
import { motion } from "framer-motion";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";

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
            <div className="row d-flex justify-content-center">
                <div className="col-md-3 d-flex justify-content-center mb-5">
                    <NavigationLink
                        route={`/packages`}
                        text={"Packages"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
                <div className="col-md-3 d-flex justify-content-center mb-5">
                    <NavigationLink
                        route={`/flavours`}
                        text={"Flavours"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
                <div className="col-md-3 d-flex justify-content-center mb-5">
                    <NavigationLink
                        route={`/promo-codes`}
                        text={"Promo Codes"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
                <div className="col-md-3 d-flex justify-content-center mb-5">
                    <NavigationLink
                        route={`/shipping-discounts`}
                        text={"Promo Codes"}
                        isAdmin={isAdmin || isEmployee}
                        className={`${styles["item"]} text-center p-5`} />
                </div>
            </div>
        </motion.div>
    </>;
}