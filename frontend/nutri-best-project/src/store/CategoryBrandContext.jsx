import { allCategories } from "../../../../backend/api/categories";
import { allBrands } from "../../../../backend/api/brands";
import { createContext, useEffect, useState } from "react";

export let CATEGORIES = [];
export let BRANDS = [];

export const CategoryBrandContext = createContext({
    categories: CATEGORIES,
    brands: [],
    setBrands: () => {},
    selectedCategories: [],
    setSelectedCategories: () => { }
});

// eslint-disable-next-line react/prop-types
export default function CategoryBrandContextProvider({ children }) {
    const [selectedCategories, setSelectedCategories] = useState(sessionStorage.getItem("categories") ?
        sessionStorage.getItem("categories").split("+").filter(x => x != "") :
        []);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    async function getCategories() {
        const response = await allCategories();
        CATEGORIES = response;
        setCategories(response);
    }

    async function getBrands() {
        const response = await allBrands();
        BRANDS = response;
        setBrands(response);
    }

    useEffect(() => {
        async function getData() {
            getCategories();
            getBrands();
        }

        getData();
    }, []);

    return <CategoryBrandContext.Provider
        value={{ categories, selectedCategories, setSelectedCategories, brands, setBrands }}>
        {children}
    </CategoryBrandContext.Provider>
}