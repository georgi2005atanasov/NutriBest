import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you're using Next.js
import styles from './css/ProfileSideBar.module.css'; // Import your CSS module

const ProfileSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='mt-5'>
            <button className={styles["toggle-button"]} onClick={toggleSidebar}>
                ☰
            </button>
            <motion.aside
                className={styles.sidebar}
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <div className="d-flex flex-column">
                    <Link to="/profile" className="d-flex ms-2 justify-content-center">Profile</Link>
                    <hr className='m-1 me-0' />
                    <Link to="/profile/address" className="d-flex ms-2 justify-content-center">Address</Link>
                </div>
            </motion.aside>
        </div>
    );
};

export default ProfileSideBar;