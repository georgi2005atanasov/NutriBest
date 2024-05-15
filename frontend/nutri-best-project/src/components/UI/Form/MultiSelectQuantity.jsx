/* eslint-disable react/prop-types */
import styles from './css/MultiSelect.module.css';
import colors from "../../../App.module.css";
import InputError from './InputError';
import { getProductsByQuantity } from '../../../../../../backend/api/api';
import { getAuthToken } from '../../../utils/auth';
import useAuth from '../../../hooks/useAuth';
import { useSubmit } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MultiSelectQuantity({ data, newQuantities = null }) {
    const [quantities, setQuantities] = useState([]);
    const [selected, setSelected] = useState([]);
    const token = getAuthToken();
    const { isAdmin, isEmployee } = useAuth(token);
    const submit = useSubmit();

    useEffect(() => {
        if (sessionStorage.getItem("quantities").split("+").filter(x => !isNaN(x)).length != 0) {
            setSelected(sessionStorage.getItem("quantities").split("+"));
        }
    }, [newQuantities]);

    useEffect(() => {
        async function getQuantities() {
            const response = await getProductsByQuantity();
            setQuantities(response);
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
            sessionStorage.setItem("quantities", newValue.filter(x => x).join("+"))
            return newValue;
        });

        return submit(null, {action: "/products/all", method: "GET"});
    };

    if (quantities.length == 0) {
        return null;
    }

    return <div className={`${styles["category-container"]} pt-2 pb-0`}>
        {quantities && quantities.map((q) => (
            <div key={q.grams} className={styles["category-item"]}>
                <input
                    type="checkbox"
                    name={q.grams}
                    id={q.grams}
                    value={q.grams}
                    onChange={handleCheckboxChange}
                    checked={selected.some(x => x == q.grams)}
                    className={`${styles["category-checkbox"]} ${styles["nav-link"]}`}
                />
                <label htmlFor={q.grams} className={`${styles["category-label"]} ${isAdmin || isEmployee ? colors["admin-color-text"] : colors["user-color-text"]}`}>
                    {q.grams}g ({q.quantity})
                </label>
            </div>
        ))}
        {data && data.message &&
            <InputError
                text={data.message}
            />}
    </div>;
}