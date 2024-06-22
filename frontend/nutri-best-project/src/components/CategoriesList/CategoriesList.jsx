/* eslint-disable react/prop-types */
import styles from "./css/CategoriesList.module.css";
import CategoryNavItem from "./CategoryNavItem";
import { motion } from "framer-motion";

export default function CategoriesList({ categories, isAdmin }) {
    return <>
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className={`${styles["categories-search"]} col-md-4 w-md-75 w-sm-50 w-100 mt-5 d-flex justify-content-center`}
        >
            <div className="row">
                {categories && categories.slice(0, 4).map(x =>
                    <CategoryNavItem key={x.name.replace(" ", "")} isAdmin={isAdmin} category={x.name} />)}
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className={`${styles["categories-search"]} col-md-4 w-md-75 w-sm-50 w-100 mt-5 d-flex justify-content-center`}
        >
            <div className="row">
                {categories && categories.slice(4, 8).map(x =>
                    <CategoryNavItem key={x.name} isAdmin={isAdmin} category={x.name} />)}
            </div>
        </motion.div>
    </>
}