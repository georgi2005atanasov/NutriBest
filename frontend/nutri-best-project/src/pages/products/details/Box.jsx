/* eslint-disable react/prop-types */
import styles from "./css/Box.module.css";
import { motion } from "framer-motion";
import { useRef, useState } from "react";


export default function Box({ item, name, isVerified }) {
    const [isOpen, setIsOpen] = useState(false); // State to manage the description visibility
    const [isChanging, setIsChanging] = useState(false);
    const itemValue = useRef(item);

    // Function to toggle the description visibility
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const variants = {
        open: { opacity: 1, height: "auto" },
        closed: { opacity: 0, height: 0 }
    };

    const handleChange = () => {
        setIsChanging(prev => !prev);
    }

    const handleSave = () => {
        console.log(itemValue.current.value);
        handleChange();
    }

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
            <div className="d-flex flex-column">
                {isChanging && <motion.textarea
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className={styles["edit-area"]}
                    ref={itemValue}
                    defaultValue={item} rows={15} />}
                {isVerified &&
                    <button
                        onClick={!isChanging ? handleChange : handleSave}
                        type="button"
                        className={`ms-3 border-0 p-3 px-5 ${isChanging && styles["save-btn"]}`}
                    >
                        {!isChanging ? "Edit" : "Save"}
                    </button>}
            </div>
        </motion.div>
    </>;
}