import styles from "./css/AddToCartButton.module.css";
import { getCart, getImageByProductId, addToCart } from "../../../../../../backend/api/api";
import { CartContext } from "../../../store/CartContext";
import { ProductSpecsContext } from "../../../store/ProductSpecsContext";
import { useSubmit } from "react-router-dom";
import { useContext, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function BuyNowButton({ productId, wrapperStyles = "", linkStyles = "" }) {
    const { productSpecs } = useContext(ProductSpecsContext)
    const { setCart } = useContext(CartContext);
    const [error, setError] = useState();
    const submit = useSubmit();

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

    async function handleCartAdd() {
        if (!productSpecs.flavour || !productSpecs.grams) {
            setError("Choose flavour/package!");
            return;
        }

        const response = await addToCart(productId, 1, productSpecs.flavour, productSpecs.grams);

        if (!response.ok) {
            const result = await response.json();
            setError(result.message);
            return;
        }

        if (error) {
            setError("");
        }

        await getCartProducts()

        window.scrollTo({
            top: 516,
            left: 0,
            behavior: 'smooth'
        });

        return submit(null, { action: "/order", method: "GET" });
    }

    return <div className={`text-center ${wrapperStyles} d-flex flex-column`}>
        <button onClick={handleCartAdd}
            className={`${linkStyles} ${styles["promotion-btn"]} ${styles["add-to-cart-btn"]}`}>
            &nbsp;Buy Now&nbsp;
        </button>
        <div className="d-flex justify-content-center align-items-center">
            {error && <span className="d-flex justify-content-center align-items-center text-danger">
                {error}
            </span>}
        </div>
    </div>;
}