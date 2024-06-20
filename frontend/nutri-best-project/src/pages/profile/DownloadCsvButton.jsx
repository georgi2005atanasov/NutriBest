import styles from "./css/DownloadCsvButton.module.css";
import { getAuthToken } from "../../utils/auth";

// eslint-disable-next-line react/prop-types
const DownloadCsvButton = ({ route }) => {
    const token = getAuthToken();

    const handleDownload = async () => {
        try {
            const response = await fetch(route, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    return (
        <button className={styles["download-btn"]} onClick={handleDownload}>Download CSV</button>
    );
};

export default DownloadCsvButton;