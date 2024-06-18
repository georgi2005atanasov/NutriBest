import { UNSAFE_DataRouterStateContext, redirect, useLoaderData } from "react-router-dom";
import TopSellingProductsChart from "./TopSellingProductsChart";
import { getTopSellingProducts, getTopSellingBrands, getTopSellingFlavours, getTopSellingCategories } from "../../../../../backend/api/report";
import TopSellingBrandsChart from "./TopSellingBrandsChart";
import TopSellingFlavoursChart from "./TopSellingFlavoursChart";
import TopSellingCategoriesChart from "./TopSellingCategoriesChart";

export default function ReportDashboard() {
    const { dataProducts,
        dataBrands,
        dataFlavours,
        dataCategories } = useLoaderData();

    console.log(dataBrands);

    return <>
        <div className="container-fluid d-flex flex-column">
            <div className="row w-100 d-flex justify-content-evenly">
                <div className="col-md-6 mb-md-0 mb-5 mt-2">
                    <TopSellingProductsChart topProducts={dataProducts.products.map(x => ({
                        productId: x.product.productId,
                        name: x.product.name,
                        soldCount: x.soldCount,
                    }))} />
                </div>
                <div className="col-md-6 mt-2">
                    <TopSellingBrandsChart topBrands={dataBrands.brands} />
                </div>
            </div>

            <div className="row w-100 d-flex justify-content-evenly mt-2">
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <TopSellingFlavoursChart topFlavours={dataFlavours.flavours} />
                </div>
                <div className="col-md-6 mb-md-0 mb-5 mt-5">
                    <TopSellingCategoriesChart topCategories={dataCategories.categories} />
                </div>
            </div>

        </div>
    </>;
}

export async function loader({ request, params }) {
    try {
        //might make 1 request, not 4, but not so mandatory
        const dataProducts = await getTopSellingProducts();
        const dataBrands = await getTopSellingBrands();
        const dataFlavours = await getTopSellingFlavours();
        const dataCategories = await getTopSellingCategories();

        return {
            dataProducts,
            dataBrands,
            dataFlavours,
            dataCategories
        };
    } catch (error) {
        return redirect("/?message=Page Not Found&type=danger");
    }
}