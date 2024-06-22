/* eslint-disable react/prop-types */
import styles from "./css/SubscribersPromoCodeSelector.module.css";
import { List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SubscribersPromoCodeSelector = ({ promoCodes, handleSelect, handleClose }) => {
    const [selectedCode, setSelectedCode] = useState(null);

    const handleCodeClick = (code) => {
        setSelectedCode(code);
        handleSelect(code);
    };

    async function handleSend() {
        
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={styles["selector-container"]}
            >
                <div className={styles["selector-header"]}>
                    <IconButton onClick={handleClose} className={styles["close-button"]}>
                        <CancelIcon />
                    </IconButton>
                </div>
                <List>
                    <h6>Choose Promo Code:</h6>
                    {promoCodes && promoCodes.map(x => (
                        <ListItem
                            key={x.description}
                            button
                            selected={selectedCode === x.description}
                            onClick={() => handleCodeClick(x.description)}
                            className={styles["promo-code-item"]}
                        >
                            <ListItemIcon>
                                {selectedCode === x.description && <CheckCircleIcon color="primary" />}
                            </ListItemIcon>
                            <ListItemText primary={x.description} />
                        </ListItem>
                    ))}
                </List>
            </motion.div>
        </>
    );
};

export default SubscribersPromoCodeSelector;