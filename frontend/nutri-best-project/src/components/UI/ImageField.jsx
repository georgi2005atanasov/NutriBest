/* eslint-disable react/prop-types */
import InputError from "./InputError"
import { useState } from "react";

export default function ImageField({styles, data}) {
    const [image, setImage] = useState(null);

    function handleRemoveImage() {
        setImage(null);
    }

    function getImage(event) {
        const imageToSet = URL.createObjectURL(event.target.files[0])
        setImage(imageToSet);
    }

    return <div className={styles["add-product-input"]}>
        <label htmlFor="image" className={styles["custom-file-upload"]}>
            Upload Image
        </label>
        <input className="d-none" type="file" name="image" id="image" onChange={getImage} />
        <button
            className={`${styles["remove-image"]}`}
            disabled={image == null}
            onClick={handleRemoveImage}>
            Remove Photo
        </button>
        {image && <img src={image} alt="Image" name="image-visual" id="image-visual" />}
        {
            data && Object.keys(data.errors).includes("Image") &&
            <InputError
                styles={styles["error-par"]}
                text={data.errors["Image"][0]}
            />}
    </div>
}