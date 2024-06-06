import styles from "./css/Profile.module.css";

// eslint-disable-next-line react/prop-types
export default function ProfileDate({ text, date }) {
    return <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
            <strong>{text}<span className={styles["date"]}>{date ? new Date(date).toLocaleDateString() : "-"}</span></strong>
        </div>
    </div>;
}