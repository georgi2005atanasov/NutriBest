/* eslint-disable react/prop-types */
import { useSubmit } from "react-router-dom";
import cartStyles from "../../components/UI/Buttons/css/AddToCartButton.module.css";

export default function AddToCartRedirect({ promotions, product }) {
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
                onClick={handleAddToCart}
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