import styles from "./css/SideBar.module.css";
import CategoryFilter from "./Filters/CategoryFilter";
import PriceFilter from "./Filters/PriceFilter";
import AlphaFilter from "./Filters/AlphaFilter";
import BrandFilter from "./Filters/BrandFilter";
import ClearFiltersButton from "../Buttons/ClearFiltersButton";
import { buildQuery, getFilters } from "../../../utils/utils";
import { motion } from "framer-motion";
import { CategoryBrandContext } from "../../../store/CategoryBrandContext";
import { useSubmit } from "react-router-dom";
import { useContext, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function SideBar({ isVisible, toggleSidebar }) {
    const { selectedCategories, brands } = useContext(CategoryBrandContext);

    const { page, categories, price, alpha, brand } = getFilters();

    const submit = useSubmit();

    useEffect(() => {
        if (selectedCategories && selectedCategories.length != 0) {
            sessionStorage.setItem("categories", categories);
        }

        if (price && price != "") {
            sessionStorage.setItem("price", price);
        }

        const query = buildQuery(page, categories, price, alpha);

        submit(query);
    }, [selectedCategories, submit, price, page, categories, alpha, brand]);

    return <>
        <div className={`${styles["filter-header"]} w-100 d-flex justify-content-between align-items-center`}>
            <h5>Filter by</h5> <i className="fa fa-filter" aria-hidden="true"></i>
        </div>
        <div className={`${styles["sidebar"]} d-flex flex-column ${isVisible ? styles['visible'] : 'd-none d-xl-flex'}`}>
            <div className="content">
                <div className={`d-flex flex-column justify-content-center`}>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CategoryFilter categoriesCount={selectedCategories.length} />
                    </motion.div>

                    <div className="mb-1"></div>

                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <PriceFilter price={price} selectedBtn={styles["selected-filter"]} />
                    </motion.div>

                    <div className="mb-1"></div>

                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BrandFilter brands={brands} />
                    </motion.div>

                    <div className="mb-1"></div>

                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <AlphaFilter alphaCount={!alpha ? "" : 1} alpha={alpha} selectedBtn={styles["selected-filter"]} />
                    </motion.div>

                    <ClearFiltersButton />
                </div>

            </div>
            <div className="mb-1"></div>
            <button onClick={toggleSidebar} className="p-2 d-xl-none border-0 rounded-1">Close</button>
        </div>
    </>
}