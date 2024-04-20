import styles from "./css/Error.module.css";
import errorImage from "../assets/error.png";

// eslint-disable-next-line react/prop-types
export default function ErrorPage({ code }) {
    return <div className={`${styles["container-err"]}`}>
        <h1 className={`${styles["wrong"]}`}>Oops! Something went wrong.</h1>
        <p className={`${styles["trouble"]}`}>We're having trouble loading the page you requested.</p>
        <img src={errorImage} alt="Error Icon" className={`${styles["error-icon"]}`} />
            <button className={`${styles["back-btn"]}`} onClick={() => history.back()}>Go Back</button>
            <p>If the problem persists, please <a href="mailto:support@supplementsapp.com">contact us</a>.</p>
    </div >
}