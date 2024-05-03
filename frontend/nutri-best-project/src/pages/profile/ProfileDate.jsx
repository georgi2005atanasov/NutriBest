import styles from "./css/Profile.module.css";
import { getDate } from "../../utils/utils";

// eslint-disable-next-line react/prop-types
export default function ProfileDate({ text, date }) {
    return <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
            <strong>{text}<span className={styles["date"]}>{date ? getDate(date) : "-"}</span></strong>
        </div>
    </div>;
}