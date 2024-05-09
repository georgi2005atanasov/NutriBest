/* eslint-disable react/prop-types */
import mainStyles from "../../../../pages/brands/css/AddBrand.module.css";
import styles from "./css/BrandImageField.module.css";
import InputError from "../../Form/InputError";
import { useState } from "react";
// import { getImageByBrandName } from "../../../../../../../backend/api/brands";

export default function ImageField({ data }) {
    const [image, setImage] = useState(null);

    function handleRemoveImage() {
        setImage(null);
    }

    function getImage(event) {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const imageToSet = URL.createObjectURL(imageFile);
            setImage(imageToSet);
        }
    }

    return (
        <div className={mainStyles["add-brand-input"]}>
            <label htmlFor="image" className={styles["custom-file-upload"]}>
                {!image ? "Upload Image" : "Change Image"}
            </label>

            <input className="d-none" type="file" name="image" id="image" onChange={getImage} />

            <button
                className={`${styles["remove-image"]}`}
                disabled={!image}
                onClick={handleRemoveImage}>
                Remove Photo
            </button>

            {image && (
                <div className="text-center my-3 card d-flex py-4 px-0 justify-content-center align-items-center">
                    <img src={image} alt="Uploaded" id={styles["image-visual"]} name={`image`} />
                </div>
            )}

            {data && data.errors && data.errors.Image && (
                <InputError
                    styles={styles["error-par"]}
                    text={data.errors.Image[0]}
                />
            )}
        </div>
    );
}