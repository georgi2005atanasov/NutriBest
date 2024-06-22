import styles from "./css/MessageSenders.module.css";
import SendPromoCodesModal from "../UI/Modals/PromoCode/SendPromoCodesModal";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function MessageSenders({ groupType }) {
    const dialog = useRef();

    const navigate = useNavigate();

    async function handleMessageSending() {
        navigate("/message");
    }

    async function handlePromoCodeSending() {
        dialog.current.open();
    }

    return <div className="d-flex justify-content-center">
        <SendPromoCodesModal ref={dialog} />
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