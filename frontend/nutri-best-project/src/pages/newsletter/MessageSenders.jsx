import { useNavigate } from "react-router-dom";
import styles from "./css/MessageSenders.module.css";

export default function MessageSenders({ groupType }) {
    const navigate = useNavigate();

    async function handleMessageSending() {
        navigate("/message");
        console.log("Custom message...");
    }

    async function handlePromoCodeSending() {
        console.log("Promo code messages...");
    }

    return <div className="d-flex justify-content-center">
        <div className="w-100 row d-flex justify-content-center mb-0">
            <div className="w-50 col-md-6 d-flex justify-content-center p-0">
                <button onClick={handleMessageSending} className={`btn ${styles["email-sender-btn"]} w-100 border-0 p-3`}>Send Message</button>
            </div>
            <div className="w-50 col-md-6 d-flex justify-content-center p-0">
                <button onClick={handlePromoCodeSending} className={`btn ${styles["email-sender-btn"]} w-100 border-0 p-3`}>Send Promo Codes</button>
            </div>
        </div>
    </div>
}