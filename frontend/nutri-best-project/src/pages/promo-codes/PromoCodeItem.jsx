/* eslint-disable react/prop-types */
import styles from "./css/PromoCodeItem.module.css";
import DeletePromoCodeModal from "../../components/UI/Modals/Delete/DeletePromoCodeModal";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function PromoCodeItem({ item }) {
    const dialog = useRef();
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the description visibility
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    function handleRemove() {
        dialog.current.open();
    }

    const variants = {
        open: { opacity: 1, height: "auto" },
        closed: { opacity: 0, height: 0 }
    }; 

    return <>
        <DeletePromoCodeModal ref={dialog} description={item.description} />
        <hr className="m-1 mt-3" />
        <h4 className="ms-3 d-flex text-italic" onClick={toggleOpen} style={{ cursor: "pointer" }}>
            <span>
                <strong className="text-danger">&quot;{item.description}&quot;</strong>
            </span>;&nbsp;{item.expireIn &&
                `Expires in: ${item.expireIn} days`}&nbsp;({item.promoCodes &&
                    `${item.promoCodes.length} left`})
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
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
            style={{ overflow: "hidden" }}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div className="w-50 d-flex ms-3">
                    {item.promoCodes && item.promoCodes.join(", ")}
                </div>
                <div className="me-md-5">
                    <button onClick={handleRemove} className={styles["remove-button"]}>Remove</button>
                </div>
            </div>
        </motion.div>
    </>;
}