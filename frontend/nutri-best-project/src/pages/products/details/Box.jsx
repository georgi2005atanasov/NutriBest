/* eslint-disable react/prop-types */
import styles from "./css/Box.module.css";
import InputError from "../../../components/UI/Form/InputError";
import { setProductDetailsById, partialEditProduct } from "../../../../../../backend/api/api";
import { motion } from "framer-motion";
import { redirect, useSubmit } from "react-router-dom";
import { useRef, useState } from "react";

export default function Box({ product, item, name, isVerified }) {
    const [isOpen, setIsOpen] = useState(false); // State to manage the description visibility
    const [isChanging, setIsChanging] = useState(false);
    const [error, setError] = useState("");
    const itemValue = useRef(item);
    const submit = useSubmit();

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
        return submit(null); // used for automatic refresh
    }

    const handleSave = async () => {
        console.log(product.productId);

        const data = new FormData();

        try {
            if (name == "How to Use") {
                data.set("howToUse", itemValue.current.value);
                await setProductDetailsById(product.productId, data);
                setError("");
            }
            else if (name == "Description") {
                data.set("description", itemValue.current.value);
                const response = await partialEditProduct(product.productId, data);

                if (response.errors) {
                    setError(response.errors["Description"][0]);
                    return;
                }

                setError("");
            }
            else if (name == "Why Choose?") {
                data.set("whyChoose", itemValue.current.value);
                await setProductDetailsById(product.productId, data);
                setError("");
            }
            else if (name == "Ingredients") {
                data.set("ingredients", itemValue.current.value);
                await setProductDetailsById(product.productId, data);
                setError("");
            }

            handleChange();
        } catch (error) {
            return redirect("/error");
        }
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

                {isVerified && error &&
                    <InputError text={error} styles="text-danger mb-3" />}

                {isVerified &&
                    <>
                        <button
                            onClick={!isChanging ? handleChange : handleSave}
                            type="button"
                            className={`ms-3 border-0 p-3 px-5 ${isChanging && styles["save-btn"]}`}
                        >
                            {!isChanging ? "Edit" : "Save"}
                        </button>
                    </>}
            </div>
        </motion.div>
    </>;
}