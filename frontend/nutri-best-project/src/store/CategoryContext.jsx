import { createContext, useState } from "react";

export const CATEGORIES = [
    { name: "proteins", value: "Proteins" },
    { name: "aminoAcids", value: "Amino Acids" },
    { name: "preWorkout", value: "Pre-Workout" },
    { name: "vitamins", value: "Vitamins" },
    { name: "creatines", value: "Creatines" },
    { name: "fatBurners", value: "Fat Burners" },
    { name: "massGainers", value: "Mass Gainers" },
    { name: "postWorkout", value: "Post-Workout" },
    { name: "vegan", value: "Vegan" },
    { name: "recovery", value: "Recovery" },
    { name: "fishOils", value: "Fish Oils" },
    { name: "offers", value: "Offers" },
]

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

    return <CategoryContext.Provider
        value={{ categories: CATEGORIES, selectedCategories, setSelectedCategories }}>
        {children}
    </CategoryContext.Provider>
}