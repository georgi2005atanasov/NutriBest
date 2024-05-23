import styles from "./css/CartModal.module.css";
import Modal from "../Modal";
import CartItemCounter from "./CartItemCounter";
import SelectFlavour from "../../UI/Form/SelectFlavour";
import { SelectPackage } from "../../UI/Form/SelectPackage";
// import { CartContext } from "../../../store/CartContext";
import { getPrice } from "../../../utils/product/products";
import { ProductSpecsContext } from "../../../store/ProductSpecsContext";
import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";
import { forwardRef, useContext } from "react";

const ChooseSpecsModal = forwardRef(function ChooseSpecsModal({ }, ref) {
    const { productSpecs, setProductSpecs } = useContext(ProductSpecsContext);
    const { productPackages, productFlavours, product } = useLoaderData();

    function handleClose(event) {
        event.stopPropagation();
        if (ref.current) {
            ref.current.close();
        }
    }

    if (product) {
        return (
            <Modal ref={ref}>
                <div className={`${styles["cart-modal"]} d-flex flex-column justify-content-center align-items-evenly`}>
                    <div className={`d-flex justify-content-end align-items-center mb-0`}>
                        <motion.i
                            className={`mx-2 mt-2 fa fa-times d-flex justify-content-end ${styles["close-cart-icon"]}`} aria-hidden="true"
                            onClick={handleClose}
                        />
                    </div>
                    <div className="d-flex flex-md-row flex-column justify-content-between">
                        <Link onClick={handleClose} className={`${styles["product-cart-item"]}`} to={`/products/details/${product.productId}/${product.name}`}>
                            <div className="d-flex justify-content-start align-items-center m-1">
                                <img className={styles["cart-image"]} src={`data:${product.image.contentType};base64,${product.image.imageData}`} alt={product.name} />
                                <div className="ms-2 d-flex flex-column">
                                    <h5 className={`mb-0 ${styles["product-name"]}`}>{product.name}</h5>
                                    <div className="text-italic ms-2">
                                        {product.promotionId ?
                                            getPrice(product.price, product.discountPercentage).toFixed(2) :
                                            product.price.toFixed(2)} BGN per package
                                    </div>
                                </div>
                            </div>
                            <hr className={`${styles["product-cart-line"]} m-1`} />
                        </Link>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="position-relative d-flex justify-content-center align-items-center">
                            <SelectFlavour flavours={productFlavours} spec={productSpecs} setSpec={setProductSpecs} />
                            <SelectPackage packages={productPackages} spec={productSpecs} setSpec={setProductSpecs} />
                        </div>
                        <div className={styles["modal-buttons"]}>
                            <button onClick={handleClose} className={`${styles["close-btn"]} border-0 w-50`}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
    return null; // Return null if product is not available
});

export default ChooseSpecsModal;