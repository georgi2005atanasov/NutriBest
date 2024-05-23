import styles from "./css/AddToCartButton.module.css";
import CartModal from "../../Modals/Cart/CartModal";
import ChooseSpecsModal from "../../Modals/Cart/ChooseSpecsModal";
import { addToCart, getCart } from "../../../../../../backend/api/cart";
import { getImageByProductId } from "../../../../../../backend/api/api";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../store/CartContext";
import { ProductSpecsContext } from "../../../store/ProductSpecsContext";

// eslint-disable-next-line react/prop-types
export default function AddToCartButton({ productId, wrapperStyles = "", linkStyles = "", isValidPromotion }) {
    const cartDialog = useRef();
    const specsDialog = useRef();
    const { setCart } = useContext(CartContext);
    const { productSpecs } = useContext(ProductSpecsContext);
    const [error, setError] = useState();

    async function getCartProducts() {
        const cartData = await getCart();

        for (const { product } of cartData.cartProducts) {
            product.image = await getImageByProductId(product.productId);
        }

        setCart(cartData);
    }

    async function handleCartAdd() {
        if (!productSpecs.flavour || !productSpecs.grams) {
            if (specsDialog.current) {
                specsDialog.current.open();
                return;
            }
            
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
        cartDialog.current.open();
    }

    return <>
        <CartModal ref={cartDialog} />
        <ChooseSpecsModal ref={specsDialog} />
        <div className="d-flex flex-column">
            <div className={`text-center ${wrapperStyles}`}>
                <button
                    onClick={handleCartAdd}
                    className={`${linkStyles} 
                ${isValidPromotion == true ? styles["promotion-btn"] : null}
                ${styles["add-to-cart-btn"]}`}>
                    Add to Cart
                </button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                {error && <span className="d-flex justify-content-center align-items-center text-danger">
                    {error}
                </span>}
            </div>
        </div>
    </>;
}