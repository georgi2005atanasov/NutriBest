import { useLoaderData } from "react-router-dom";

export default function AllNotifications() {
    const data = useLoaderData();

    return <>
    all
    </>;
}

export async function loader({request, params}) {
    return null;
}