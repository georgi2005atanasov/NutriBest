/* eslint-disable react/prop-types */
import styles from './css/MultiSelect.module.css';
import colors from "../../../App.module.css";
import InputError from './InputError';
import { getProductsByCategories } from '../../../../../../backend/api/api';
import { CategoryBrandContext } from '../../../store/CategoryBrandContext';
import useAuth from '../../../hooks/useAuth';
import { useRouteLoaderData } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export default function MultiSelectCategory({ data, errorStyle, productCategories = null }) {
    const { categories, selectedCategories, setSelectedCategories } = useContext(CategoryBrandContext);
    const categoriesCount = useRouteLoaderData("categoriesCount");
    
    const token = useRouteLoaderData("rootLoader");
    const { isAdmin } = useAuth(token);

    useEffect(() => {
        if (productCategories) {
            setSelectedCategories(productCategories);
            sessionStorage.setItem("categories", productCategories.join("+"))
        }
    }, [productCategories, setSelectedCategories]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (sessionStorage.getItem("search")) {
            sessionStorage.removeItem("search")
        }

        setSelectedCategories(prev => {
            let newValue = checked ? [...prev, value] : prev.filter(val => val !== value);
            sessionStorage.setItem("categories", newValue.join("+"))
            return newValue;
        });
    };

    return <div className={`${styles["category-container"]} pt-2 pb-0`}>
        {categories && categories.map((category) => (
            <div key={category.name} className={styles["category-item"]}>
                <input
                    type="checkbox"
                    name={category.name.replace(" ", "")}
                    id={category.name.replace(" ", "")}
                    value={category.name}
                    onChange={handleCheckboxChange}
                    checked={selectedCategories.some(x => x == category.name)}
                    className={`${styles["category-checkbox"]} ${styles["nav-link"]}`}
                />
                <label htmlFor={category.name.replace(" ", "")} className={`${styles["category-label"]} ${isAdmin ? colors["admin-color-text"] : colors["user-color-text"]}`}>
                    {category.name} {categoriesCount != undefined && <>
                        ({categoriesCount &&
                            categoriesCount.filter(x => x.category == category.name)[0] != undefined ?
                            categoriesCount.filter(x => x.category == category.name)[0].count : "0"})
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