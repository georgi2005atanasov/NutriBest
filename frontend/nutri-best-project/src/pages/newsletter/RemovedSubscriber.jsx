import styles from './css/RemovedSubscriber.module.css';
import { Link, redirect } from "react-router-dom";
import { motion } from 'framer-motion';
import { unsubscribeFromNewsletter } from '../../../../../backend/api/api';

export default function RemovedSubscriber() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles["removed-subscriber-box"]}
            >
                <h1>You&apos;ve been unsubscribed</h1>
                <p>We&apos;re sorry to see you go. If you change your mind, you can always resubscribe to our newsletter.</p>
                <Link to="/" className={styles["home-link"]}>Go to Homepage</Link>
            </motion.div>
        </div>
    );
}

export async function loader({ request, params }) {
    try {
        const { email } = params;

        const response = await unsubscribeFromNewsletter(email);

        if (!response.succeeded) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

        if (!email) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

        return null;
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}