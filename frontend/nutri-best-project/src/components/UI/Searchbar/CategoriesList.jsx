import styles from "./css/CategoriesList.module.css";
import NavigationLink from "../../Navigation/NavigationLink";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function CategoriesList({ isAdmin, setFilter }) {
    return <>
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className={`${styles["categories-search"]} col-md-4 w-md-75 w-sm-50 w-100 mt-4 d-flex justify-content-center`}
        >
            <div className="row">
                <div id={styles["protein"]} className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Proteins"}
                        text={"Proteins"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Proteins")} />
                </div>
                <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Creatines"}
                        text={"Creatines"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Creatines")} />
                </div>
                <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Vitamins"}
                        text={"Vitamins"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Vitamins")} />
                </div>
                <div id={styles["promo"]} className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Promotions"}
                        text={"Promotions"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Promotions")} />
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className={`${styles["categories-search"]} col-md-4 w-md-75 w-sm-50 w-100 mt-4 d-flex justify-content-center`}
        >
            <div className="row">
                <div id={styles["pre-workout"]} className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Pre-Workout"}
                        text={"Pre-Workout"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Pre-Workout")} />
                </div>
                <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Post-Workout"}
                        text={"Post-Workout"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Post-Workout")} />
                </div>
                <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Fish Oils"}
                        text={"Fish Oils"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Fish Oils")} />
                </div>
                <div className={`${styles["category-from-nav"]} col-2 m-0 w-100`}>
                    <NavigationLink
                        route={"/products/all?page=1&categories=Fat Burners"}
                        text={"Fat Burners"}
                        isAdmin={isAdmin}
                        onClick={() => setFilter("categories", "Fat Burners")} />
                </div>
            </div>
        </motion.div>
    </>
}