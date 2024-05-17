/* eslint-disable react/prop-types */
import Box from "./Box"

export default function IngredientsBox({ product, isVerified }) {
    return <Box
        product={product}
        item={product.ingredients}
        name="Ingredients"
        isVerified={isVerified} />
}