/* eslint-disable react/prop-types */
import { useContext } from 'react';
import styles from "../css/MultiSelect.module.css";
import { CategoryContext } from '../../../store/CategoryContext';
import InputError from '../InputError';
import { getProductsByCategories } from '../../../../../../backend/api/api';
import { useRouteLoaderData } from 'react-router-dom';

export default function MultiSelectCategory({ data, errorStyle }) {
    const { categories, selectedCategories, setSelectedCategories } = useContext(CategoryContext);
    const categoriesCount = useRouteLoaderData("categoriesCount");

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
                <label htmlFor={category.name} className={styles["category-label"]}>
                    {category.value} {categoriesCount != undefined && <>
                        ({categoriesCount &&
                            categoriesCount.filter(x => x.category == category.value)[0] != undefined ?
                            categoriesCount.filter(x => x.category == category.value)[0].count : "0"})
                    </>}
                </label>
            </div>
        ))}
        {data && Object.keys(data.errors).includes("Category") &&
            <InputError
                styles={errorStyle}
                text={data.errors["Category"][0]}
            />}
    </div>;
}

export async function loader({ request, params }) {
    const categoriesCount = await getProductsByCategories();

    return categoriesCount;
}