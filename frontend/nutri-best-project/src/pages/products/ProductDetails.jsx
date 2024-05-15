import alt from "../../assets/fallback-image.png";
import styles from "./css/ProductDetails.module.css";
import itemStyles from "./css/ProductItem.module.css";
import { getPrice } from "../../utils/product/products";
import AddToCartButton from "../../components/UI/Buttons/AddToCartButton";
import MultiSelectPromotion from "../../components/UI/Promotions/MultiSelectPromotion";
import { allPromotions, getProductDetailsByIdAndName, getProductSpecs, getImageByProductId } from "../../../../../backend/api/api";
import { getAuthToken } from "../../utils/auth";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SelectFlavour from "../../components/UI/Form/SelectFlavour";
import { ProductSpecsContext } from "../../store/ProductSpecsContext";
import ProductSpecsContextProvider from "../../store/ProductSpecsContext";

export default function ProductDetails() {
    const [src, setSrc] = useState("");
    const token = getAuthToken();
    const { productSpecs, setProductSpecs, flavours, packages, setPackages, setFlavours } = useContext(ProductSpecsContext);
    const { isAdmin, isEmployee } = useAuth(token);
    const { product, promotions, promotion, specs } = useLoaderData();
    const [flavour, setFlavour] = useState("");
    const [grams, setGrams] = useState(0);

    console.log(specs);
    console.log(flavours);
    console.log(packages);

    useEffect(() => {
        async function getImage(productId) {
            const image = await getImageByProductId(productId);
            setSrc(`data:${image.contentType};base64,${image.imageData}`);
        }

        const src = localStorage.getItem(`image-${product.productId}`);

        if (!src) {
            getImage(product.productId);
            return;
        }

        setSrc(src);
    }, [product]);

    useEffect(() => {
        setPackages(specs.map(x => ({ grams: x.grams })));
        // i may think over how i set the flavours but this works totally fine
        setFlavours(specs.map(x => ({ flavour: x.flavour, name: x.flavour })));
    }, [specs, setPackages, setFlavours]);

    if (promotion != null) {
        return <>
            <div className="container mt-5 d-flex justify-content-start">
                {isAdmin && <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />}
            </div>
            
            <motion.div
                className="container mt-5 d-flex flex-md-row flex-column"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
            >
                <div className="col-md-4 d-flex flex-column">
                    <h3 className={`${itemStyles["promotion-name"]} product-name text-start mt-2 mb-2`}>
                        {product.name}
                    </h3>
                    <section className="d-flex justify-content-end">
                        <div className={styles["promotion-box"]}>
                            {promotion && Math.floor(promotion.discountPercentage)}<strong>%</strong>
                        </div>
                        {src ? <img
                            className={`${itemStyles["product-image"]} 
                ${itemStyles["promotion-border"]}`}
                            src={src} alt="Dynamic" /> :
                            <img className={itemStyles["fallback-image"]} src={alt} alt="Dynamic" />}
                    </section>
                </div>
                <div className="ms-md-5 col-md-6 d-flex flex-column mt-5">
                    <hr className="m-1" />
                    <div className="ms-3">Related Categories: {product.categories.join(", ")}</div>
                    <hr className="m-1" />
                    <div className="ms-3">Manufacturer: {product.brand}</div>
                    <hr className="m-1" />
                    <h3 className="product-price text-center mb-2">
                        <span className={itemStyles["new-price"]}>
                            {getPrice(product.price, promotion.discountPercentage).toFixed(2)} BGN
                        </span>
                        <span className={itemStyles["original-price"]}>
                            {(product.price).toFixed(2)} BGN
                        </span>
                    </h3>

                    <div className="d-flex justify-content-center text-secondary">
                        Saved:&nbsp;
                        <span className={`text-center ${itemStyles["new-price"]}`}>
                            {((product.price) - getPrice(product.price, promotion.discountPercentage)).toFixed(2)} BGN
                        </span>
                    </div>
                    <SelectFlavour flavours={flavours} spec={flavours} setSpec={setFlavours} />
                    <AddToCartButton isValidPromotion={promotion != null} wrapperStyles="mt-3" linkStyles="px-5 py-3" />
                </div>
            </motion.div>
        </>;
    }

    return <>
        <div className="container mt-5 d-flex justify-content-start">
            {isAdmin && <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />}
        </div>

        <motion.div
            className="container mt-5 d-flex flex-md-row flex-column"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
        >
            <div className="col-md-4 d-flex flex-column">
                <h2 className={`${itemStyles["promotion-name"]} product-name text-start mt-2 mb-3`}>
                    {product.name}
                </h2>
                <section className="d-flex">
                    {src ? <img
                        className={`${itemStyles["product-image"]} 
                ${itemStyles["promotion-border"]}`}
                        src={src} alt="Dynamic" /> :
                        <img className={itemStyles["fallback-image"]} src={alt} alt="Dynamic" />}
                </section>
            </div>
            <div className="ms-md-5 col-md-6 d-flex flex-column mt-5">
                <hr className="m-1" />
                <div className="ms-3">Related Categories: {product.categories.join(", ")}</div>
                <hr className="m-1" />
                <div className="ms-3">Manufacturer: {product.brand}</div>
                <hr className="m-1" />

                <h3 className="product-price text-center mb-2">
                    <span>
                        {(product.price).toFixed(2)} BGN
                    </span>
                </h3>
                <SelectFlavour />
                <AddToCartButton isValidPromotion={promotion != null} wrapperStyles="mt-3" linkStyles="px-5 py-3" />
            </div>
        </motion.div>
    </>;
}

export async function loader({ request, params }) {
    const { id, name } = params;

    const product = await getProductDetailsByIdAndName(id, name);
    const promotions = await allPromotions();
    const promotion = promotions.filter(x => x.isActive && x.promotionId == product.promotionId)[0] || null;

    const specsResponse = await getProductSpecs(id, name);

    if (!specsResponse.ok) {
        return redirect("/error");
    }

    const specs = await specsResponse.json();

    return {
        product,
        promotions,
        promotion,
        specs
    };
}