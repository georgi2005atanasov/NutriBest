/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./css/PromotionButtons.module.css";

export default function EditPromotionButton({ promotion }) {
    return <div>
        <Link
            className={styles["edit-promotion-btn"]}
            to={`/promotions/edit/${promotion.promotionId}`}
        >
            Edit
        </Link>
    </div>;
}