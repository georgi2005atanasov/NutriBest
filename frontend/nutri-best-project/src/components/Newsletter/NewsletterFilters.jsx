/* eslint-disable react/prop-types */
import styles from "./css/NewsletterFilters.module.css";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const NewsletterFilters = forwardRef(function NewsletterFilters({ onSelectFilter }, ref) {
    const filters = [
        { label: "All", value: "all" },
        { label: "Anonymous", value: "guests" },
        { label: "Users", value: "users" },
        { label: "With Orders", value: "withOrders" },
        { label: "Without Orders", value: "withoutOrders" },
    ];

    return (
        <motion.div
            className={`d-flex justify-content-around ${styles["filter-options"]}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    className={`btn ${styles["newsletter-btn"]} ${ref.current === filter.value ? 'btn-primary' : 'btn-light'}`}
                    onClick={() => onSelectFilter(filter.value)}
                >
                    {filter.label}
                </button>
            ))}
        </motion.div>
    );
});

export default NewsletterFilters;