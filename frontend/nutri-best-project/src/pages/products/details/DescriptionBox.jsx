/* eslint-disable react/prop-types */
import Box from "./Box";

export default function DescriptionBox({ product, isVerified }) {
    return <Box item={product.description} name="Description" isVerified={isVerified} />;
}