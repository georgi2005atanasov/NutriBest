/* eslint-disable react/prop-types */
import styles from "./css/PromoCodeItem.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PromoCodeItem({ item, isVerified }) {
    const [isOpen, setIsOpen] = useState(false); // State to manage the description visibility
    const [error, setError] = useState("");

    // Function to toggle the description visibility
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const variants = {
        open: { opacity: 1, height: "auto" },
        closed: { opacity: 0, height: 0 }
    };

    return <>
        <hr className="m-1 mt-3" />
        <h4 className="ms-3 d-flex text-italic" onClick={toggleOpen} style={{ cursor: "pointer" }}>
            <span>
                <strong className="text-danger">&quot;{item.description}&quot;</strong>
            </span>;&nbsp;{item.expireIn &&
                `Expires in: ${item.expireIn} days`}&nbsp;({item.promoCodes &&
                    `${item.promoCodes.length} left`})
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }} // Rotate span when clicked
                transition={{ duration: 0.2 }} // Animation duration
            >
                &#9652;
            </motion.span>
            <br />
        </h4>
        <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }} // Hide overflow during animation
        >
            <div className="d-flex justify-content-between align-items-center">
                <div className="w-50 d-flex ms-3">
                    {item.promoCodes && item.promoCodes.join(", ")}
                </div>
                <div className="me-md-5">
                    <button className={styles["remove-button"]}>Remove</button>
                    {/* {isVerified && error &&
                    <InputError text={error} styles="text-danger mb-3" />} */}
                </div>
            </div>
        </motion.div>
    </>;
}