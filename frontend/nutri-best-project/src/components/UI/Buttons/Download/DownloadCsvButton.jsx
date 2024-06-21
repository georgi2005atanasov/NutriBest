import styles from "./css/DownloadCsvButton.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const DownloadCsvButton = ({ fileName, exportFunction }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDownload = async (withFilters) => {
        try {
            const response = await exportFunction(withFilters,
                withFilters && sessionStorage.getItem("categories"),
                withFilters && sessionStorage.getItem("price"),
                withFilters && sessionStorage.getItem("alpha"),
                withFilters && sessionStorage.getItem("search"),
                withFilters && sessionStorage.getItem("priceRange"),
                withFilters && sessionStorage.getItem("brand"),
                withFilters && sessionStorage.getItem("quantities"),
                withFilters && sessionStorage.getItem("flavours")
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute("download", `${fileName}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    return (
        <div className={styles["download-container"]}>
            <button
                className={styles["download-btn"]}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                Download...
            </button>
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles["dropdown"]}
                    >
                        <button
                            className={styles["dropdown-btn"]}
                            onClick={() => handleDownload(false)}
                        >
                            Download All CSV
                        </button>
                        <button
                            className={styles["dropdown-btn"]}
                            onClick={() => handleDownload(true)}
                        >
                            Download Filtered CSV
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DownloadCsvButton;