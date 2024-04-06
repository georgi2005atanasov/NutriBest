import instaLogo from "../assets/instagram-icon.png";
import facebookLogo from "../assets/facebook-icon.png";
import { Link } from "react-router-dom";
import styles from "./css/Footer.module.css"

export default function FooterPage() {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-content"]}>
                <nav className={styles["footer-nav"]}>
                    <Link to="/home">Home</Link>
                    <Link to="/shop">Shop All</Link>
                    <Link to="/protein">Protein</Link>
                    <Link to="/pre-workout">Pre-Workout</Link>
                    <Link to="/vitamins">Vitamins</Link>
                </nav>
                <div className={styles["footer-social"]}>
                    <Link to="https://www.instagram.com/atanasowww7/" target="_blank">
                        <img src={instaLogo} alt="Instagram logo" />
                    </Link>
                    <Link to="https://www.facebook.com/georgi.atanasov.5891004?locale=bg_BG" target="_blank">
                        <img src={facebookLogo} alt="Facebook logo" />
                    </Link>
                </div>
                <div className={styles["footer-bottom"]}>
                    <p>© {new Date().getFullYear()} FitFuel, Inc. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}