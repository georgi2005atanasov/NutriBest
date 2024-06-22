/* eslint-disable react/prop-types */
import styles from "../css/ChangeLayoutButton.module.css";

export default function ChangeLayoutButton({ text, ...props }) {
    return <div>
        <button className={`${styles["change-layout-btn"]}`} {...props}>{text}</button>
    </div>;
}