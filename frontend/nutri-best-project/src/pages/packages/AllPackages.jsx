import { allPackages } from "../../../../../backend/api/packages";
import { redirect, useLoaderData } from "react-router-dom";

export default function AllPackages() {
    const { packages } = useLoaderData();
    console.log(packages);

    return <div>all</div>;
}

export async function loader({ request, params }) {
    try {
        const packages = await allPackages();

        return {
            packages
        }
    } catch (error) {
        return redirect("/error")
    }
}