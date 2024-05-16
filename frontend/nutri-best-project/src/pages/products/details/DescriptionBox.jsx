/* eslint-disable react/prop-types */
import Box from "./Box";

export default function DescriptionBox({ product, isVerified }) {
    return <Box
        product={product}
        item={product.description}
        name="Description"
        isVerified={isVerified} />;
}