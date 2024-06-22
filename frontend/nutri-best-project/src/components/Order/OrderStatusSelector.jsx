/* eslint-disable react/prop-types */
import styles from './css/OrderStatusSelector.module.css';
import { motion } from 'framer-motion';

const orderOptions = ['Finished', 'Confirmed', 'Paid', 'Shipped'];

const OrderStatusSelector = ({ selectedOptions, setSelectedOptions }) => {
    console.log(selectedOptions);

    const toggleOption = (option) => {
        setSelectedOptions(prevSelected =>
            prevSelected.includes(option)
                ? prevSelected.filter(item => item !== option)
                : [...prevSelected, option]
        );
    };

    return (
        <section className="w-100 d-flex justify-content-center">
            <div className={styles["order-status-selector"]}>
                {orderOptions.map((option) => (
                    <motion.div
                        key={option}
                        className={`w-100 ${styles["option"]} ${selectedOptions && selectedOptions.includes(option) ? styles["selected"] : ''}`}
                        onClick={() => toggleOption(option)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {option}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OrderStatusSelector;