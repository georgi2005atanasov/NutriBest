/* eslint-disable react/prop-types */
import { getImageByProductId } from "../../../../../../backend/api/api";
import InputError from "./InputError"
import { useEffect, useState } from "react";

export default function ImageField({ styles, data, product = null }) {
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
        async function handleOldImage() {
            try {
                if (product) {
                    const image = await getImageByProductId(product.productId);
                    const imageDataUrl = `data:${image.contentType};base64,${image.imageData}`;
                    setOldImage(imageDataUrl);
                }
            } catch (error) {
                console.error('Failed to load image:', error);
            }
        }

        handleOldImage();
    }, [product]);

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

            {product && <>
                <h4 className="text-center mt-4">Previous Image:</h4>
                {oldImage &&
                    <div className="text-center my-3 card d-flex py-4 px-0 justify-content-center align-items-center">
                        <img src={oldImage} alt="Uploaded" id={styles["image-visual"]} name={`image`} />
                    </div>}

                <h4 className="text-center mt-4">New Image:</h4>
            </>}

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