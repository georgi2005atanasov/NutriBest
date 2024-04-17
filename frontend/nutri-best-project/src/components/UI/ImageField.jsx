/* eslint-disable react/prop-types */
import { getImageByProductId } from "../../../../../backend/api/api";
import InputError from "./InputError"
import { useEffect, useState } from "react";

export default function ImageField({ styles, data, product = null }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function handleImage() {
            try {
                if (product) {
                    const image = await getImageByProductId(product.productId);
                    const imageDataUrl = `data:${image.contentType};base64,${image.imageData}`;

                    if (!localStorage.getItem(`image-${product.productId}`)) {
                        localStorage.setItem(`image-${product.productId}`, imageDataUrl);
                    }

                    setImage(imageDataUrl);
                    console.log(document.images);
                }
            } catch (error) {
                console.error('Failed to load image:', error);
            }
        }

        handleImage();
    }, [product]);

    function handleRemoveImage() {
        setImage(null);
    }

    function getImage(event) {
        const imageFile = event.target.files[0];
        if (imageFile) {
            const imageToSet = URL.createObjectURL(imageFile);
            console.log(document.images);

            setImage(imageToSet);
        }
    }

    return (
        <div className={styles["add-product-input"]}>
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
                <div className="text-center my-3">
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