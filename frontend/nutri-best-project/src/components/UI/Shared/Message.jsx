import styles from "./css/Message.module.css";

// eslint-disable-next-line react/prop-types
export default function Message({ message, messageType, addStyles="" }) {
    return <div className={`${styles["fade-message"]} mt-2 mx-3 alert alert-${messageType} ${addStyles}`} role="alert">
        {message}
    </div>
}