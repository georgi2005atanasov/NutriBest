import styles from "./css/Message.module.css";

// eslint-disable-next-line react/prop-types
export default function Message({ message, messageType }) {
    return <div className={`${styles["fade-message"]} mx-3 alert alert-${messageType}`} role="alert">
        {message}
    </div>
}