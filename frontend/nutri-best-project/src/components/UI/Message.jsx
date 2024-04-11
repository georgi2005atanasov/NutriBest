import styles from "./css/Message.module.css";

// eslint-disable-next-line react/prop-types
export default function Message({ message }) {
    return <div className={`${styles["fade-message"]} mx-3 alert alert-success`} role="alert">
        {message}
    </div>
}