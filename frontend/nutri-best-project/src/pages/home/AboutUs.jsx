import styles from "./css/AboutUs.module.css";

const AboutUs = () => {
    return (
        <section className={styles["about-us-section"]}>
            <div className={styles["about-us-overlay"]}>
                <div className={styles["about-us-content"]}>
                    <h2>Welcome to NutriBest!</h2>
                    <p>
                        At NutriBest, we are dedicated to bringing you the highest quality fitness supplements from the most trusted brands around the world. Our mission is to support your journey to a healthier, stronger, and more vibrant life.
                    </p>
                    <p>
                        <strong>Why Choose Us?</strong>
                    </p>
                    <ul>
                        <li><strong>Top Brands:</strong> We stock only the best brands that have been proven to deliver results.</li>
                        <li><strong>High Quality:</strong> Our products are thoroughly tested to ensure they meet the highest standards.</li>
                        <li><strong>Customer Satisfaction:</strong> We prioritize your satisfaction and are here to help you every step of the way.</li>
                        <li><strong>Expert Advice:</strong> Our knowledgeable team is available to provide expert guidance on the best supplements for your needs.</li>
                        <li><strong>Competitive Prices:</strong> We offer unbeatable prices on all our products.</li>
                    </ul>
                    <p>
                        Join the NutriBest community today and experience the difference quality supplements can make. Your fitness journey deserves the best.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;