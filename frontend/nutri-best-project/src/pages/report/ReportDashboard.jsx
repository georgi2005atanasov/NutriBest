import styles from "./css/ReportDashboard.module.css";
import SellingProductsChart from "./SellingProductsChart";
import SellingBrandsChart from "./SellingBrandsChart";
import SellingFlavoursChart from "./SellingFlavoursChart";
import SellingCategoriesChart from "./SellingCategoriesChart";
import { getDemographicsInfo, getPerformanceInfo } from "../../../../../backend/api/report";
import { redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import ChartsRow from "./ChartsRows";
import Demographics from "./Demographics";

export default function ReportDashboard() {
    const { data, demographics } = useLoaderData();
    const [view, setView] = useState('products');

    console.log(data, demographics);

    const renderContent = () => {
        switch (view) {
            case 'products':
                return <ChartsRow
                    top={<SellingProductsChart
                        products={data && data.topSellingProducts.map(x => ({
                            productId: x.product.productId,
                            name: x.product.name,
                            soldCount: x.soldCount,
                            price: x.price
                        }))}
                        header="Top Selling Products" />}
                    weak={<SellingProductsChart
                        products={data && data.weakProducts.map(x => ({
                            productId: x.product.productId,
                            name: x.product.name,
                            soldCount: x.soldCount,
                            price: x.price
                        }))}
                        header="Weak Products" />}
                />
            case 'flavours':
                return <ChartsRow
                    top={<SellingFlavoursChart
                        flavours={data && data.topSellingFlavours}
                        header="Top Selling Flavours" />}
                    weak={<SellingFlavoursChart
                        flavours={data && data.weakFlavours}
                        header="Weak Flavours" />}
                />
            case 'brands':
                return <ChartsRow
                    top={<SellingBrandsChart
                        brands={data && data.topSellingBrands}
                        header="Top Selling Brands" />}
                    weak={<SellingBrandsChart
                        brands={data && data.weakBrands}
                        header="Weak Brands" />}
                />
            case 'categories':
                return <ChartsRow
                    top={<SellingCategoriesChart
                        categories={data && data.topSellingCategories}
                        header="Top Selling Categories" />}
                    weak={<SellingCategoriesChart
                        categories={data && data.weakCategories}
                        header="Weak Categories" />}
                />
            default:
                return null;
        }
    };

    return (
        <>
            <h2 className={`${styles["btn-color"]} p-2 mt-3 mb-0 text-center`}>Statistics</h2>
            <div className="container mb-2 d-flex justify-content-center mt-3">
                <div className="row d-flex flex-row">
                    <div className="col-md-3 d-flex justify-content-center">
                        <button
                            className={`w-100 btn ${view === 'products' ? 'btn-primary' : `${styles["btn-color"]}`} mx-2 my-1`}
                            onClick={() => setView('products')}
                        >
                            Products
                        </button>
                    </div>

                    <div className="col-md-3 d-flex justify-content-center">
                        <button
                            className={`w-100 btn ${view === 'categories' ? 'btn-primary' : `${styles["btn-color"]}`} mx-2 my-1`}
                            onClick={() => setView('categories')}
                        >
                            Categories
                        </button>
                    </div>

                    <div className="col-md-3 d-flex justify-content-center">
                        <button
                            className={`w-100 btn ${view === 'brands' ? 'btn-primary' : `${styles["btn-color"]}`} mx-2 my-1`}
                            onClick={() => setView('brands')}
                        >
                            Brands
                        </button>
                    </div>

                    <div className="col-md-3 d-flex justify-content-center">
                        <button
                            className={`w-100 btn ${view === 'flavours' ? 'btn-primary' : `${styles["btn-color"]}`} mx-2 my-1`}
                            onClick={() => setView('flavours')}
                        >
                            Flavours
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                {renderContent()}
            </div>
            <Demographics demographics={demographics} />
        </>
    );
}

export async function loader({ request, params }) {
    try {
        const data = await getPerformanceInfo();
        const demographics = await getDemographicsInfo();

        return {
            data,
            demographics
        };
    } catch (error) {
        return redirect("/?message=Page Not Found&type=danger");
    }
}