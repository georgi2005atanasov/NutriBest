import styles from "../../../../pages/products/css/ProductItem.module.css";
import table from "../../../../pages/css/Table.module.css";
import { allFlavours, allPackages } from "../../../../../../../backend/api/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductSpecsContext } from "../../../../store/ProductSpecsContext";

// eslint-disable-next-line react/prop-types
export default function EditProductButton({ productId, isTable = false }) {
    const { setFlavours, setPackages } = useContext(ProductSpecsContext);

    async function resetContext() {
        const responsePackage = await allPackages();
        const responseFlavours = await allFlavours();
        setPackages(responsePackage);
        setFlavours(responseFlavours);
    }

    if (isTable) {
        return <>
            <Link to={`/products/edit/${productId}`} className={`${table["btn"]} ${table["edit"]} me-1 mb-1`}>Edit</Link>
        </>;
    }

    return <div className="col-6 d-flex justify-content-center mb-1">
        <Link to={`/products/edit/${productId}`} className={styles["edit-btn"]} onClick={resetContext}>Edit</Link>
    </div>
}
