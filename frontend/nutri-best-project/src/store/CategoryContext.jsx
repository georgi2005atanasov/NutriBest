import { createContext, useEffect, useRef, useState } from "react";
import { allCategories } from "../../../../backend/api/categories";

// export const CATEGORIES = [
//     { name: "proteins", value: "Proteins" },
//     { name: "aminoAcids", value: "Amino Acids" },
//     { name: "preWorkout", value: "Pre-Workout" },
//     { name: "vitamins", value: "Vitamins" },
//     { name: "creatines", value: "Creatines" },
//     { name: "fatBurners", value: "Fat Burners" },
//     { name: "massGainers", value: "Mass Gainers" },
//     { name: "postWorkout", value: "Post-Workout" },
//     { name: "vegan", value: "Vegan" },
//     { name: "recovery", value: "Recovery" },
//     { name: "fishOils", value: "Fish Oils" },
//     { name: "promotions", value: "Promotions" },
// ];

// export const CATEGORIES = [
//     { name: "Proteins" },
//     { name: "Amino Acids" },
//     { name: "Pre-Workout" },
//     { name: "Vitamins" },
//     { name: "Creatines" },
//     { name: "Fat Burners" },
//     { name: "Mass Gainers" },
//     { name: "Post-Workout" },
//     { name: "Vegan" },
//     { name: "Recovery" },
//     { name: "Fish Oils" },
//     { name: "Promotions" },
// ];

export let CATEGORIES = [];

export const CategoryContext = createContext({
    categories: CATEGORIES,
    selectedCategories: [],
    setSelectedCategories: () => { }
});

// eslint-disable-next-line react/prop-types
export default function CategoryContextProvider({ children }) {
    const [selectedCategories, setSelectedCategories] = useState(sessionStorage.getItem("categories") ?
        sessionStorage.getItem("categories").split("+").filter(x => x != "") :
        []);
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        const response = await allCategories();
        CATEGORIES = response;
        setCategories(response);
    }
    useEffect(() => {
        getCategories();
    }, []);

    return <CategoryContext.Provider
        value={{ categories, selectedCategories, setSelectedCategories }}>
        {children}
    </CategoryContext.Provider>
}