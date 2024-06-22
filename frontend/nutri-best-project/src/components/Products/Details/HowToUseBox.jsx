/* eslint-disable react/prop-types */
import Box from "./Box";

export default function HowToUseBox({ product, isVerified }) {
    return <Box
        product={product}
        item={product.howToUse}
        name="How to Use"
        isVerified={isVerified} />
}