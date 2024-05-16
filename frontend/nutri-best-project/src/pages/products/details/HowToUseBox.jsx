/* eslint-disable react/prop-types */
import Box from "./Box";

export default function HowToUseBox({ product }) {
    return <Box item={product.howToUse} name="How to Use" />
}