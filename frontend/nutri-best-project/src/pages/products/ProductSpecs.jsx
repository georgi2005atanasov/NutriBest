/* eslint-disable react/prop-types */
import specsStyle from "./css/ProductSpecs.module.css";
import styles from "./css/ProductForm.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import { SelectPackage } from "../../components/UI/Form/SelectPackage";
import { useContext, useEffect, useState } from "react";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import SelectFlavour from "../../components/UI/Form/SelectFlavour";

export default function ProductSpecs({ data }) {
    const { packages, flavours, setProductSpecs, productSpecs } = useContext(ProductSpecsContext);

    const [spec, setSpec] = useState({
        flavour: "",
        grams: 0,
        quantity: 0
    })

    useEffect(() => {
        console.log(productSpecs);
    }, [productSpecs]);

    if (!packages || packages.length == 0) {
        return null;
    }

    function handleQuantity(event) {
        if (isNaN(event.target.value)) {
            return;
        }

        setSpec(prev => {
            prev.quantity = Number(event.target.value);
            return prev;
        })
    }

    function handleAdd() {
        if (!spec.flavour || !spec.grams || spec.quantity <= 0) {
            return;
        }

        if (productSpecs.some(x => x.flavour == spec.flavour && x.grams == spec.grams)) {
            return;
        }

        setProductSpecs(prev => {
            return [...prev, JSON.parse(JSON.stringify(spec))]
            //gotta create a copy of every new spec of the products
        });
    }

    return <div className="container-fluid">
        <div className="row mt-1 mb-5">{JSON.stringify(productSpecs)}</div>
        <div className="row d-flex justify-content-evenly align-items-center">
            <div className="col-xl-3 d-flex flex-column align-items-center justify-content-center">
                <h5 className={specsStyle["flavour-header"]}>Flavour:</h5>
                <SelectFlavour flavours={flavours} spec={spec} setSpec={setSpec} />
            </div>

            <div className={`${specsStyle["package-wrapper"]} col-xl-4 p-0 ps-xl-4 d-flex flex-column align-items-center justify-content-center`}>
                <h5 className={specsStyle["package-header"]}>Package Size:</h5>
                <SelectPackage packages={packages} spec={spec} setSpec={setSpec} />
            </div>

            <div className="col-xl-3 pt-2 ps-xl-3">
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
                    defaultValue={spec.quantity}
                    onChange={handleQuantity}
                    placeholder=""
                />
            </div>
        </div>
        <div className={`row ${styles["add-product-input"]} mt-0`}>
            <button type="button" onClick={handleAdd} className={`text-center m-0 mb-3`}>Add Specification</button>
        </div>

        <input type="hidden" name="productSpecs" id="productSpecs" value={JSON.stringify(productSpecs)} />
    </div>;
}