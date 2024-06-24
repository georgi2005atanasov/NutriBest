/* eslint-disable react/prop-types */
import styles from "./css/ContactUs.module.css";

const ContactUs = ({ contactDetails }) => {
  return (
    <section id="contact-us" className={styles["contact-us-section"]}>
      <div className={styles["contact-us-overlay"]}>
        <div className={styles["contact-us-content"]}>
          <h2>Contact Us</h2>
          <p>We&apos;d love to hear from you! Reach out to us using the information below:</p>
          <div className={styles["contact-info"]}>
            <p><strong>Email:</strong> <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${contactDetails.phoneNumber}`}>{contactDetails.phoneNumber}</a></p>
            <p><strong>Address: {contactDetails.address}</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;