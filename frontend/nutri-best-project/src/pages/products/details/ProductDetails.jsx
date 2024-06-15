import alt from "../../../assets/fallback-image.png";
import styles from "../css/ProductDetails.module.css";
import itemStyles from "../css/ProductItem.module.css";
import { getPrice } from "../../../utils/product/products";
import MultiSelectPromotion from "../../../components/UI/Promotions/MultiSelectPromotion";
import {
    allPromotions, getProductDetailsByIdAndName, getProductSpecs,
    getImageByProductId, getNutritionFactsByProductIdAndName,
    getCurrentProductPrice
} from "../../../../../../backend/api/api";
import { getAuthToken } from "../../../utils/auth";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SelectFlavour from "../../../components/UI/Form/SelectFlavour";
import { SelectPackage } from "../../../components/UI/Form/SelectPackage";
import { ProductSpecsContext } from "../../../store/ProductSpecsContext";
import MainDetails from "./MainDetails";
import PagesNav from "./PagesNav";
import DetailsButtons from "./DetailsButtons";
import DetailsWrapper from "./DetailsWrapper";
import NutritionFacts from "./NutritionFacts";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetails() {
    const [src, setSrc] = useState("");
    const token = getAuthToken();
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentQuantity, setCurrentQuantity] = useState(null);
    const [error, setError] = useState("");
    const { isAdmin, isEmployee } = useAuth(token);
    const { productSpecs, setProductSpecs } = useContext(ProductSpecsContext);
    const { product, promotion, productPackages, productFlavours, nutritionFacts } = useRouteLoaderData("productDetails");

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
        async function getCurrentPrice() {
            const data = await getCurrentProductPrice(product.productId, productSpecs.flavour,
                productSpecs.grams);

            if (isNaN(data.price)) {
                setError(`${productSpecs.flavour} of ${productSpecs.grams}g is not available!`);
                setCurrentPrice(null);
                setCurrentQuantity(null);
                return;
            }

            setError("");
            setCurrentPrice(data.price);
            setCurrentQuantity(data.quantity);
        }

        if (productSpecs.flavour && productSpecs.grams) {
            getCurrentPrice();
        }
    }, [productSpecs, product]);

    if (promotion != null) {
        return <>
            {(isAdmin || isEmployee) && <div className="container mt-5 d-flex justify-content-start">
                <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />
            </div>}

            <motion.div
                className="container mt-md-0 mt-4 d-flex flex-lg-row flex-column"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
            >
                <div className="col-lg-7 d-flex flex-column">
                    <PagesNav
                        product={product.name}
                        wrapperStyle={styles["previous-pages"]}
                        linkStyle={styles["page-promo"]} />

                    <h3 className={`product-name text-start mt-2 mb-2`}>
                        {product.name}
                    </h3>

                    <section className="d-flex justify-content-end">
                        <div className={styles["promotion-box"]}>
                            {promotion && Math.floor(product.discountPercentage)}<strong>%</strong>
                        </div>
                        {src ? <img
                            className={`${itemStyles["product-image"]} 
                                ${itemStyles["promotion-border"]}`}
                            src={src} alt="Dynamic" /> :
                            <img className={itemStyles["fallback-image"]} src={alt} alt="Dynamic" />}
                    </section>
                </div>

                <div className="ms-md-3 col-lg-5 d-flex flex-column mt-lg-3 mt-2">
                    <MainDetails product={product} isVerified={isAdmin || isEmployee} />

                    <section className="border m-2 py-4 px-0">
                        <h2 className="product-price text-center mt-0">
                            <span className={itemStyles["new-price"]}>
                                {!currentPrice ?
                                    getPrice(product.price, product.discountPercentage).toFixed(2) :
                                    getPrice(currentPrice, product.discountPercentage).toFixed(2)} BGN
                            </span>
                            <span className={itemStyles["original-price"]}>
                                {!currentPrice || error ?
                                    `from ${(product.price).toFixed(2)} BGN` :
                                    `${(currentPrice).toFixed(2)} BGN`}
                            </span>
                        </h2>

                        <div className="d-flex justify-content-center text-secondary">
                            Saved:&nbsp;
                            <span className={`text-center ${itemStyles["new-price"]}`}>
                                {!currentPrice ?
                                    ((product.price) - getPrice(product.price, product.discountPercentage)).toFixed(2) :
                                    ((currentPrice) - getPrice(currentPrice, product.discountPercentage)).toFixed(2)} BGN
                            </span>
                        </div>

                        {currentQuantity && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-center m-3 text-danger"
                            >
                                {currentQuantity} left
                            </motion.div>
                        )}

                        {product.quantity > 0 ? <>
                            <SelectFlavour flavours={productFlavours} spec={productSpecs} setSpec={setProductSpecs} />
                            <SelectPackage packages={productPackages} spec={productSpecs} setSpec={setProductSpecs} />
                        </> :
                            <h3 className="text-center text-danger">Out of Stock!</h3>}

                        {error && <div className="d-flex justify-content-center mt-2">
                            <span className="text-danger">{error}</span>
                        </div>}

                        <DetailsButtons
                            productId={product.productId}
                            isVerified={isAdmin || isEmployee}
                            promotion={promotion} />
                    </section>

                    <DetailsWrapper product={product} isVerified={isAdmin || isEmployee} />
                </div>
            </motion.div>

            <motion.div
                className="d-flex flex-column align-items-center justify-content-center m-2"
            >
                <NutritionFacts
                    nutriFacts={nutritionFacts}
                    product={product}
                    isVerified={isAdmin || isEmployee} />
            </motion.div>

            <RelatedProducts product={product} />
        </>;
    }

    return <>
        {(isAdmin || isEmployee) && <div className="container mt-5 d-flex justify-content-start">
            <MultiSelectPromotion promotionId={product.promotionId} productId={product.productId} />
        </div>}

        <motion.div
            className="container mt-md-0 mt-4 d-flex flex-lg-row flex-column"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
        >
            <div className="col-lg-7 d-flex flex-column">
                <PagesNav
                    product={product.name}
                    wrapperStyle={styles["previous-pages"]}
                    linkStyle={styles["page"]} />

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

            <div className="ms-md-3 col-lg-5 d-flex flex-column mt-lg-5 mt-2">
                <MainDetails product={product} isVerified={isAdmin || isEmployee} />

                <section className="border m-2 py-4 px-0">
                    <h2 className="product-price text-center mb-3 mt-0">
                        <span>
                            {!currentPrice || error ?
                                `${(product.price).toFixed(2)} BGN` :
                                `${(currentPrice).toFixed(2)} BGN`}
                        </span>
                    </h2>

                    {product.quantity > 0 ? <>
                        <SelectFlavour flavours={productFlavours} spec={productSpecs} setSpec={setProductSpecs} />
                        <SelectPackage packages={productPackages} spec={productSpecs} setSpec={setProductSpecs} />
                    </> :
                        <h3 className="text-center text-danger">Out of Stock!</h3>}

                    {error && <div className="d-flex justify-content-center mt-2">
                        <span className="text-danger">{error}</span>
                    </div>}

                    <DetailsButtons
                        productId={product.productId}
                        isVerified={isAdmin || isEmployee}
                        promotion={promotion} />
                </section>

                <DetailsWrapper product={product} isVerified={isAdmin || isEmployee} />
            </div>
        </motion.div>

        <motion.div
            className="d-flex flex-column align-items-center justify-content-center"
        >
            <NutritionFacts
                nutriFacts={nutritionFacts}
                product={product}
                isVerified={isAdmin || isEmployee} />
        </motion.div>

        <RelatedProducts product={product} />
    </>;
}

export async function loader({ request, params }) {
    const { id, name } = params;

    const product = await getProductDetailsByIdAndName(id, name);
    const promotions = await allPromotions();
    const promotion = promotions.filter(x => x.isActive && x.promotionId == product.promotionId)[0] || null;
    const specsResponse = await getProductSpecs(id, name);
    const nutritionFacts = await getNutritionFactsByProductIdAndName(id, name);

    if (!specsResponse.ok) {
        return redirect("/error");
    }

    const specs = await specsResponse.json();

    const uniqueGrams = new Map();
    const uniqueFlavours = new Map();

    // Populate the Map
    specs.forEach(item => {
        if (!uniqueGrams.has(item.grams)) {
            uniqueGrams.set(item.grams, item);
        }

        if (!uniqueFlavours.has(item.flavour)) {
            uniqueFlavours.set(item.flavour, { flavour: item.flavour, name: item.flavour });
        }
    });

    const productPackages = Array.from(uniqueGrams.values());
    const productFlavours = Array.from(uniqueFlavours.values());

    return {
        product,
        promotions,
        promotion,
        specs,
        productPackages,
        productFlavours,
        nutritionFacts
    };
}