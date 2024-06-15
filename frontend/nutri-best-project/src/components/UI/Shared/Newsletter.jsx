import styles from './css/Newsletter.module.css';
import { addToNewsletter } from '../../../../../../backend/api/api';
import { motion } from 'framer-motion';
import { redirect, useFetcher } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Newsletter() {
    const fetcher = useFetcher();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState();

    useEffect(() => {
        async function checkErrors() {
            if (fetcher.data && fetcher.data.result) {
                const result = await fetcher
                    .data
                    .result
                    .json();
                if (result.message) {
                    setMessage({
                        text: result.message,
                        type: "danger"
                    });
                }
                else if (!isNaN(result)) {
                    setMessage({
                        text: "You have been successfully signed up for our newsletter!",
                        type: "success"
                    });
                }
            }
        }

        checkErrors();
    }, [fetcher.data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetcher.submit({ email }, { method: 'post', action: '/addToNewsletter' });
        setMessage("");
    };

    return (
        <div className={styles["newsletter"]}>
            <h3>Sign up for our Newsletter</h3>
            <fetcher.Form onSubmit={handleSubmit} className={styles["newsletter-form"]}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles["newsletter-input"]}
                    required
                />
                {message && (
                    <motion.span
                        className={`text-${message.type} mb-2`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        {message.text}
                    </motion.span>
                )}
                <button type="submit" className={styles["newsletter-btn"]}>Sign Up</button>
            </fetcher.Form>
        </div>
    );
}

export default Newsletter;

export async function action({ request, params }) {
    try {
        const data = await request.formData(request);
        const result = await addToNewsletter(data);

        return {
            result
        };
    } catch (error) {
        return redirect("/?message=Invalid Request&type=danger");
    }
}