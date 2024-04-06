/* eslint-disable react/prop-types */
import styles from "./Loader.module.css";

export default function Loader() {
    return <div className={styles["loading-screen"]}>
        <div className={styles["loading"]}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
}