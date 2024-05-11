/* eslint-disable react/prop-types */
import specs from "./css/ProductSpecs.module.css";
import styles from "./css/ProductForm.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import { SelectPackage } from "../../components/UI/Form/SelectPackage";
import { useContext } from "react";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import SelectFlavour from "../../components/UI/Form/SelectFlavour";

export default function ProductSpecs({ data }) {
    const { packages, flavours } = useContext(ProductSpecsContext);

    if (!packages || packages.length == 0) {
        return null;
    }

    return <div className="container-fluid">
        <div className="row d-flex justify-content-evenly align-items-center">
            <div className="col-xl-3 d-flex flex-column align-items-center justify-content-center">
                <h5 className={specs["flavour-header"]}>Flavour:</h5>
                <SelectFlavour flavours={flavours} />
            </div>

            <div className={`${specs["package-wrapper"]} col-xl-4 p-0 ps-xl-5 d-flex flex-column align-items-center justify-content-center`}>
                <h5 className={specs["package-header"]}>Package Size:</h5>
                <SelectPackage packages={packages} />
            </div>

            <div className="col-xl-3 pt-2 ps-xl-4">
                <FormInput
                    styles={`${styles["add-product-input"]} p-0 m-0`}
                    text="Quantity"
                    error={
                        data && data.errors && Object.keys(data.errors).includes("Quantity") &&
                        <InputError
                            styles={styles["error-par"]}
                            text={data.errors["Quantity"][0]}
                        />}
                    id="quantity"
                    type="number"
                    name="quantity"
                    placeholder=""
                />
            </div>
        </div>
        <div className={`row ${styles["add-product-input"]} mt-0`}>
            <button className={`text-center m-0 mb-3`}>Add Specification</button>
        </div>
    </div>;
}