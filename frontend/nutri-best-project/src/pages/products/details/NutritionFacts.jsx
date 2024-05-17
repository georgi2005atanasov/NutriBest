/* eslint-disable react/prop-types */
import styles from "./css/NutritionFacts.module.css";
import InputError from "../../../components/UI/Form/InputError";
import { setNutritionFactsByProductId } from "../../../../../../backend/api/nutritionFacts";
import { useSubmit } from "react-router-dom";
import { useRef, useState } from "react";

export default function NutritionFacts({ nutriFacts, product, isVerified }) {
    const [error, setError] = useState("");
    const submit = useSubmit()

    const facts = useRef({
        carbohydrates: nutriFacts.carbohydrates || "",
        fats: nutriFacts.fats || "",
        saturatedFats: nutriFacts.saturatedFats || "",
        proteins: nutriFacts.proteins || "",
        sugar: nutriFacts.sugar || "",
        salt: nutriFacts.salt || "",
        energyValue: nutriFacts.energyValue || "",
    })

    const [isChanging, setIsChanging] = useState(false);

    async function handleNutritionChange(event, name) {
        facts.current[name] = event.target.value;
        console.log(facts.current[name]);
        console.log(facts.current);
    }

    function handleChange() {
        setIsChanging(prev => !prev);
    }

    async function handleSave() {
        if (!isChanging) {
            return;
        }

        const response = await setNutritionFactsByProductId(product.productId, facts.current);

        if (response.message) {
            setError(response.message);
            return;
        }

        setIsChanging(prev => !prev);
        setError("");
        return submit(null);
    }

    return (
        <>
            <table className={`${styles["nutrition-table"]} mt-3 border-0`}>
                <thead>
                    <tr>
                        <th>Nutrient</th>
                        <th>Per 100g</th>
                        <th>In one dose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Carbohydrates</strong>
                        </td>
                        <td className="d-flex justify-content-between">
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.carbohydrates || ""}
                                    onChange={(e) => handleNutritionChange(e, 'carbohydrates')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.carbohydrates} g</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.carbohydrates / 100).toFixed(2)} g</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Fats</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.fats || ""}
                                    onChange={(e) => handleNutritionChange(e, 'fats')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.fats} g</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.fats / 100).toFixed(2)} g</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Saturated Fats</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.saturatedFats || ""}
                                    onChange={(e) => handleNutritionChange(e, 'saturatedFats')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.saturatedFats} g</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.saturatedFats / 100).toFixed(2)} g</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Proteins</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.proteins || ""}
                                    onChange={(e) => handleNutritionChange(e, 'proteins')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.proteins} g</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.proteins / 100).toFixed(2)} g</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Sugars</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.sugars || ""}
                                    onChange={(e) => handleNutritionChange(e, 'sugars')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.sugars} g</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.sugars / 100).toFixed(2)} g</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Salt</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.salt || ""}
                                    onChange={(e) => handleNutritionChange(e, 'salt')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.salt} mg</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.salt / 100).toFixed(2)} mg</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Energy Value</strong>
                        </td>
                        <td>
                            {isChanging ? (
                                <input
                                    type="text"
                                    defaultValue={nutriFacts.energyValue || ""}
                                    onChange={(e) => handleNutritionChange(e, 'energyValue')}
                                    className="form-control"
                                />
                            ) : <>
                                <strong>{nutriFacts.energyValue} kcal</strong>
                            </>}
                        </td>
                        <td>
                            <strong>{(nutriFacts.energyValue / 100).toFixed(2)} kcal</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            {isVerified && (
                <button
                    onClick={!isChanging ? handleChange : handleSave}
                    className={`${styles["edit-facts-btn"]} ${isChanging && styles["save-color"]}`}
                >
                    {!isChanging ? "Edit Table" : "Save Table"}
                </button>
            )}

            {<InputError text={error} styles="text-danger" />}
        </>
    );
}