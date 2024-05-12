/* eslint-disable react/prop-types */
import specsStyle from "./css/ProductSpecs.module.css";
import styles from "./css/ProductForm.module.css";
import FormInput from "../../components/UI/Form/FormInput";
import InputError from "../../components/UI/Form/InputError";
import { SelectPackage } from "../../components/UI/Form/SelectPackage";
import { useContext, useEffect, useState } from "react";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import SelectFlavour from "../../components/UI/Form/SelectFlavour";

export default function ProductSpecs({ data, currProductSpecs }) {
    const { packages, flavours, setProductSpecs, productSpecs } = useContext(ProductSpecsContext);

    const [spec, setSpec] = useState({
        flavour: "",
        grams: 0,
        quantity: 0
    })

    useEffect(() => {
        if (currProductSpecs) {
            setProductSpecs(currProductSpecs);
        }
    }, [setProductSpecs, currProductSpecs]);

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

    function removeSpec(flavour, grams) {
        setProductSpecs(prev => {
            const specToRemove = prev.find(x => x.flavour == flavour && x.grams == grams);
            console.log(specToRemove);
            return [...prev.filter(x => x != specToRemove)];
        });
    }

    return <div className="container-fluid">
        {productSpecs.length > 0 ?
            <>
                {productSpecs.map(x =>
                    <div key={`${x.flavour}${x.grams}`} className="row d-flex align-items-center">
                        <div className={`${specsStyle["spec-container"]} d-flex col-md-8 me-1 justify-content-center align-items-center`}>
                            Flavour: {x.flavour}, Package: {x.grams}g, Quantity: {x.quantity}
                        </div>
                        <button onClick={() => removeSpec(x.flavour, x.grams)} type="button" className={`${specsStyle["remove-button"]} d-flex col-md-3 justify-content-center align-items-center`}>Remove</button>
                    </div>)}
                <div>Total: {productSpecs
                    .map(x => x.quantity)
                    .reduce((acc, x) => acc += x, 0)} products</div>
            </> :
            undefined}
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