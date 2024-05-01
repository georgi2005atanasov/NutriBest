import styles from "./css/MultiSelectPromotion.module.css";

// eslint-disable-next-line react/prop-types
export default function InvalidPromotionMessage({ message }) {
    return <span className={`${styles["invalid-promotion"]} w-75 text-danger`}>{message}</span>;
}