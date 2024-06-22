/* eslint-disable react/prop-types */
import styles from './css/GrantModal.module.css';
import Modal from '../Modal';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { allRoles } from '../../../../../../../backend/api/auth';
import { motion } from 'framer-motion';
import { useState, useEffect, forwardRef } from 'react';
import { grantUser, disownUser } from '../../../../../../../backend/api/admin';

const GrantModal = forwardRef(function GrantModal({ profile }, ref) {
    let [currentRoles, setCurrentRoles] = useState(profile.currentRoles);
    const [message, setMessage] = useState({
        text: "",
        type: ""
    });
    const [roles, setRoles] = useState([]);

    function handleClose(event) {
        event.stopPropagation();
        if (currentRoles && currentRoles.length > 0) {
            ref.current.close();
        } else {
            alert("Please select at least one role.");
        }
    }

    useEffect(() => {
        async function handleRoles() {
            const resultRoles = await allRoles();

            if (resultRoles.roles) {
                setRoles(resultRoles.roles);
            }
        }

        handleRoles();
    }, []);

    useEffect(() => {
        if (profile.currentRoles.length > 0) {
            setCurrentRoles(profile.currentRoles);
        }
    }, [profile]);

    async function handleRoleChange(event) {
        const role = event.target.name;
        if (event.target.checked) {
            const response = await grantUser(profile.profileId, role);

            if (!response.ok) {
                const data = await response.json();

                if (data.message) {
                    setMessage({
                        text: data.message,
                        type: "danger"
                    });
                    return;
                }

                setMessage({
                    text: "Something went wrong!",
                    type: "danger"
                });

                return;
            }

            const data = await response.json();
            
            setMessage({
                text: data.message,
                type: "success"
            });

            setCurrentRoles(prev => [...prev, role]);
        }
        else {
            const response = await disownUser(profile.profileId, role);

            if (!response.ok) {
                const data = await response.json();

                if (data.message) {
                    setMessage({
                        text: data.message,
                        type: "danger"
                    });
                    return;
                }

                setMessage({
                    text: "Something went wrong!",
                    type: "danger"
                });
                return;
            }

            const data = await response.json();

            setMessage({
                text: data.message,
                type: "success"
            });

            setCurrentRoles(prev => [...prev.filter(x => x !== role)]);
        }
    }

    return (
        <Modal ref={ref}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="d-flex justify-content-center mb-3">
                    <button
                        onClick={handleClose}
                        className={`${styles["close-btn"]} border-0 p-3 w-100`}
                    >
                        Close
                    </button>
                </div>
                <h4>Grant {profile && profile.name} as</h4>
                {message && <span className={`text-${message.type}`}>{message.text}</span>}
                <FormGroup>
                    {roles.map(role => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentRoles && currentRoles.includes(role)}
                                    onChange={handleRoleChange}
                                    name={role}
                                    sx={{
                                        color: '#333',
                                        '&.Mui-checked': {
                                            color: '#333',
                                        },
                                    }}
                                />
                            }
                            label={role}
                            key={role}
                        />
                    ))}
                </FormGroup>
            </motion.div>
        </Modal>
    );
});

export default GrantModal;