/* eslint-disable react/prop-types */
import cartStyles from "./css/AddToCartButton.module.css";
import { useSubmit } from "react-router-dom";

export default function AddToCartRedirect({ isLoading, promotions, product }) {
    const submit = useSubmit();

    function handleAddToCart() {
        window.scrollTo({
            top: 516,
            left: 0,
            behavior: 'smooth'
        });

        return submit(null, { action: `/products/details/${product.productId}/${product.name}`, method: "GET" });
    }

    return <div className="d-flex flex-column">
        <div className={`text-center`}>
            <button
                onClick={!isLoading ? handleAddToCart : () => {}}
                className={`${promotions
                    .filter(x => x.isActive)
                    .some(x => x.promotionId == product.promotionId) == true ?
                    cartStyles["promotion-btn"] : null}
        ${cartStyles["add-to-cart-btn"]}`}>
                Add to Cart
            </button>
        </div>
    </div>
}