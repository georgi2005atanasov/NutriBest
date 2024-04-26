import styles from "./css/Profile.module.css";

// eslint-disable-next-line react/prop-types
export default function ProfileDate({ text, date }) {
    return <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
            <strong>{text}<span className={styles["date"]}>{date ? getDate(date) : "-"}</span></strong>
        </div>
    </div>;
}

function getDate(dateString) {
    const date = new Date(dateString);

    // Extract components using getFullYear, getMonth, and getDate
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth returns 0-11, add 1 for 1-12
    const day = date.getDate();

    // Ensure month and day are always two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}/${formattedMonth}/${formattedDay}`;
}