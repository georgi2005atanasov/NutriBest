import { useLoaderData, useSearchParams } from "react-router-dom";

export default function FinishedOrder() {
    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    console.log(orderId);
    return <div>success #{orderId}</div>
}

export async function loader({ request, params }) {
    // 6 leading nulls (0)
    return null;
}