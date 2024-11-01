import styles from './css/Newsletter.module.css';
import { addToNewsletter } from '../../../../../../backend/api/api';
import { motion } from 'framer-motion';
import { redirect, useFetcher } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sendJoinedToNewsletter } from '../../../../../../backend/api/api';

function Newsletter() {
    const fetcher = useFetcher();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState();

    useEffect(() => {
        async function checkErrors() {
            if (fetcher.data && fetcher.data.result) {
                try {
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

                        await sendJoinedToNewsletter(email);
                        return;
                    }
                    setEmail("");
                } catch (error) {
                    return redirect("/?message=Could not Subscribe!&type=danger");
                }
            }
        }

        checkErrors();
    }, [fetcher.data, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetcher.submit({ email }, { method: 'post', action: '/addToNewsletter' });
        setMessage("");
    };

    return (
        <div className={`${styles["newsletter"]}`}>
            <h3 className="mb-3">Sign up for our Newsletter</h3>
            <fetcher.Form onSubmit={handleSubmit} className={`${styles["newsletter-form"]} 
            d-flex flex-row justify-content-center align-items-center`}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles["newsletter-input"]}
                    required
                />
                <button type="submit" className={styles["newsletter-btn"]}>Sign Up</button>
            </fetcher.Form>
            {message && (
                <motion.span
                    className={`text-${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    {message.text}
                </motion.span>
            )}
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