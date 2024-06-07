import { useEffect } from 'react';
import styles from './ConfirmEmail.module.css';
import { Link, redirect, useSubmit } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ConfirmEmail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !email) {
            navigate('/?message=Page Not Found!&type=danger');
        }
    }, [token, email, navigate]);

    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <h1>Email Confirmed!</h1>
            </div>
            <div className={styles["content"]}>
                <p>Thank you for confirming your email address!</p>
                <p>As a token of our appreciation, a promo code is awaiting you in the email.</p>
                <p>Use this promo code at checkout to enjoy your discount.</p>
                <Link to="/" className={styles["promo-code"]}>
                    <span>Back to Home page</span>
                </Link>
            </div>
        </div>
    );
}