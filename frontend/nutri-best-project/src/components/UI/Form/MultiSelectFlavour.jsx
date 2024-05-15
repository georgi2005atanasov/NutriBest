/* eslint-disable react/prop-types */
import styles from './css/MultiSelect.module.css';
import colors from "../../../App.module.css";
import { getAuthToken } from '../../../utils/auth';
import useAuth from '../../../hooks/useAuth';
import { useSubmit } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductsByFlavour } from '../../../../../../backend/api/products';

export default function MultiSelectFlavour({ newFlavours, selected, setSelected }) {
    const [flavours, setFlavours] = useState([]);
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);

    useEffect(() => {
        setSelected(sessionStorage.getItem("flavours").split(" and "));
    }, [newFlavours.length, setSelected]);

    useEffect(() => {
        async function getQuantities() {
            const response = await getProductsByFlavour();
            setFlavours(response);
        }

        getQuantities();
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (sessionStorage.getItem("search")) {
            sessionStorage.removeItem("search")
        }

        setSelected(prev => {
            let newValue = checked ? [...prev, value] : prev.filter(val => val !== value);
            sessionStorage.setItem("flavours", newValue.filter(x => x).join(" and "))
            return newValue;
        });
    };

    if (flavours.length == 0) {
        return null;
    }

    return <div className={`${styles["category-container"]} pt-2 pb-0`}>
        {flavours && flavours.map((f) => (
            <div key={f.name} className={styles["category-item"]}>
                <input
                    type="checkbox"
                    name={f.name}
                    id={f.name}
                    value={f.name}
                    onChange={handleCheckboxChange}
                    checked={selected.some(x => x == f.name)}
                    className={`${styles["category-checkbox"]} ${styles["nav-link"]}`}
                />
                <label htmlFor={f.name} className={`${styles["category-label"]} ${isAdmin || isEmployee ? colors["admin-color-text"] : colors["user-color-text"]}`}>
                    {f.name} ({f.count})
                </label>
            </div>
        ))}
    </div>;
}