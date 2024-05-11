import { allFlavours, allPackages } from "../../../../backend/api/api";
import { createContext, useEffect, useState } from "react";

export const ProductSpecsContext = createContext({
    productSpecs: [{flavour: "", quantity: 0, grams: 0}],
    setProductSpecs: () => {},
    packages: [],
    flavours: []
});

// eslint-disable-next-line react/prop-types
export default function ProductSpecsContextProvider({ children }) {
    const [productSpecs, setProductSpecs] = useState([]);
    const [packages, setPackages] = useState([]);
    const [flavours, setFlavours] = useState([]);

    async function getPackages() {
        const response = await allPackages();
        setPackages(response);
    }

    async function getFlavours() {
        const response = await allFlavours();
        setFlavours(response);
    }

    useEffect(() => {
        async function getData() {
            await getPackages();
            await getFlavours();
        }

        getData();
    }, []);

    return <ProductSpecsContext.Provider
        value={{ productSpecs, setProductSpecs, packages, flavours }}>
        {children}
    </ProductSpecsContext.Provider>
}