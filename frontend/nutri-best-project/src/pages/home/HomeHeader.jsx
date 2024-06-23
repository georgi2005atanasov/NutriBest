import { useNavigate } from "react-router-dom";
import homePagePhoto from "../../assets/top-home-page-image-min.png";
import styles from "./css/HomeHeader.module.css";
import { motion } from "framer-motion";

const HomeHeader = () => {
    const navigate = useNavigate();

    function handleShopNow() {
        navigate("/products/all");
    }

    return (
        <header className={styles["header"]}>
            <motion.div
                className={styles["header-content"]}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles["welcome-message"]}>
                    <h2>Welcome to NutriBest!</h2>
                    <p>Your one-stop shop for the best fitness supplements.</p>
                </div>
                <div className={styles["image-container"]}>
                    <img src={homePagePhoto} alt="Fitness Supplements" className={styles["header-image"]} />
                    <motion.button
                        className={`${styles["shop-button"]}`}
                        onClick={handleShopNow}
                    >
                        Shop Now
                    </motion.button>
                </div>
            </motion.div>
        </header>
    );
};

export default HomeHeader;