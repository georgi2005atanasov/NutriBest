/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";


export default function Box({ item, name }) {
    const [isOpen, setIsOpen] = useState(false); // State to manage the description visibility

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
        <h4 className="ms-3 d-flex" onClick={toggleOpen} style={{ cursor: "pointer" }}>
            {name} &nbsp;
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
            <p className="ps-3">
                {item}
            </p>
        </motion.div>
    </>;
}