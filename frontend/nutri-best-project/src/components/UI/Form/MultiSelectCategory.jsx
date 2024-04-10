/* eslint-disable react/prop-types */
import { useContext } from 'react';
import styles from "../css/MultiSelect.module.css";
import { CategoryContext } from '../../../store/CategoryContext';
import InputError from '../InputError';

export default function MultiSelectCategory({ data, errorStyle }) {
    const { categories, selectedCategories, setSelectedCategories } = useContext(CategoryContext);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(cat => cat !== value)
        );
    };

    return <div className={`${styles["category-container"]} pt-2 pb-0`}>
        {categories && categories.map((category) => (
            <div key={category.value} className={styles["category-item"]}>
                <input
                    type="checkbox"
                    name={category.name}
                    id={category.name}
                    value={category.value}
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.some(x => x == category.value)}
                    className={styles["category-checkbox"]}
                />
                <label htmlFor={category.name} className={styles["category-label"]}>{category.value}</label>
            </div>
        ))}
        {data && Object.keys(data.errors).includes("Category") &&
            <InputError
                styles={errorStyle}
                text={data.errors["Category"][0]}
            />}
    </div>;
}
