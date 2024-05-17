/* eslint-disable react/prop-types */
import Box from "./Box";

export default function WhyChooseBox({ product, isVerified }) {
    return <Box
        product={product}
        item={product.whyChoose}
        name="Why Choose?"
        isVerified={isVerified} />
}