import { useLoaderData } from "react-router-dom";
import { getProductDetailsByIdAndName } from "../../../../../backend/api/api";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
    const { product } = useLoaderData();

    return <motion.div
        className="all-products d-flex justify-content-end"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.7 }}
    >
        {product.name}
    </motion.div>
}

export async function loader({ request, params }) {
    const { id, name } = params;

    const product = await getProductDetailsByIdAndName(id, name);

    return {
        product
    };
}