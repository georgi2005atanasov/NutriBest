import { redirect, useLoaderData } from "react-router-dom";
import SellingProductsChart from "./SellingProductsChart";
import { getPerformanceInfo } from "../../../../../backend/api/report";
import SellingBrandsChart from "./SellingBrandsChart";
import SellingFlavoursChart from "./SellingFlavoursChart";
import SellingCategoriesChart from "./SellingCategoriesChart";

export default function ReportDashboard() {
    const { data } = useLoaderData();

    console.log(data);

    return <>
        <div className="container-fluid d-flex flex-column mt-2">
            <div className="row w-100 d-flex justify-content-evenly">
                <div className="col-md-6 mb-md-0 mb-5 mt-2">
                    <SellingProductsChart
                        products={data.topSellingProducts.map(x => ({
                            productId: x.product.productId,
                            name: x.product.name,
                            soldCount: x.soldCount,
                        }))}
                        header="Top Selling Products"
                    />
                </div>
                <div className="col-md-6 mt-2">
                    <SellingProductsChart products={data.weakProducts.map(x => ({
                        productId: x.product.productId,
                        name: x.product.name,
                        soldCount: x.soldCount,
                    }))}
                        header="Weak Products" />
                </div>
            </div>

            <div className="row w-100 d-flex justify-content-evenly mt-2">
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <SellingFlavoursChart
                        flavours={data.topSellingFlavours}
                        header="Top Selling Flavours" />
                </div>
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <SellingFlavoursChart
                        flavours={data.weakFlavours}
                        header="Weak Flavours" />
                </div>
            </div>
        </div>

        <div className="mt-5 container-fluid d-flex flex-column">
            <div className="row w-100 d-flex justify-content-evenly">
                <div className="col-md-6 mb-md-0 mb-5 mt-2">
                    <SellingBrandsChart
                        brands={data.topSellingBrands}
                        header="Top Selling Brands" />
                </div>
                <div className="col-md-6 mb-5 mt-2">
                    <SellingBrandsChart
                        brands={data.weakBrands}
                        header="Weak Brands" />
                </div>
            </div>

            <div className="row w-100 d-flex justify-content-evenly mt-2">
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <SellingCategoriesChart
                        categories={data.topSellingCategories}
                        header="Top Selling Categories" />
                </div>
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <SellingCategoriesChart
                        categories={data.weakCategories}
                        header="Weak Categories" />
                </div>
            </div>
        </div>
    </>;
}

export async function loader({ request, params }) {
    try {
        const data = await getPerformanceInfo();

        return {
            data
        };
    } catch (error) {
        return redirect("/?message=Page Not Found&type=danger");
    }
}