/* eslint-disable react/prop-types */
import styles from './css/OverallSalesVolume.module.css';

export default function OverallSalesVolume({ overallSalesVolume }) {
    return (
        <div className={styles["volume-wrapper"]}>
            <h2 className={styles["volume-header"]}>Overall Sales Volume:&nbsp;</h2>
            <p className={`${styles["volume-amount"]} text-primary`}>{overallSalesVolume && overallSalesVolume.toFixed(2)} BGN</p>
        </div>
    );
}