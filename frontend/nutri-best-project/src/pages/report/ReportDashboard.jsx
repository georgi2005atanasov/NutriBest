import styles from "./css/ReportDashboard.module.css";
import DateFilterField from "../order/DateFilterField";
import SellingProductsChart from "./SellingProductsChart";
import SellingBrandsChart from "./SellingBrandsChart";
import SellingFlavoursChart from "./SellingFlavoursChart";
import SellingCategoriesChart from "./SellingCategoriesChart";
import ChartsRow from "./ChartsRows";
import Demographics from "./Demographics";
import OverallSalesVolume from "./OverallSalesVolume";
import { exportPerformanceInfo, getDemographicsInfo, getPerformanceInfo } from "../../../../../backend/api/report";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import DownloadCsvOptionsButton from "../../components/UI/Buttons/Download/DownloadCsvOptionsButton";

export default function ReportDashboard() {
    const { data, demographics } = useLoaderData();
    const [view, setView] = useState('products');
    const submit = useSubmit();

    useEffect(() => {
        return () => {
            sessionStorage.removeItem("startDatePerformance");
            sessionStorage.removeItem("endDatePerformance");
            sessionStorage.removeItem("startDateDemographics");
            sessionStorage.removeItem("endDateDemographics");
        };
    }, []);

    const handleInterval = useCallback(function handleInterval(identifier, value) {
        sessionStorage.setItem(identifier, value.toISOString());
        return submit(null, { action: "/report/dashboard", method: "GET" });
    }, [submit]);

    const handlePerformanceExport = useCallback(async function handlePerformanceExport(hasFilters) {
        return await exportPerformanceInfo(hasFilters,
            hasFilters && sessionStorage.getItem("startDatePerformance"),
            hasFilters && sessionStorage.getItem("endDatePerformance")
        );
    }, []);

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
            <OverallSalesVolume overallSalesVolume={data.overallSalesVolume} />
            <hr />
            <h2 className={`${styles["btn-color"]} p-2 mt-3 mb-0 text-center`}>Statistics</h2>
            <div className="container mb-2 d-flex align-items-center justify-content-evenly mt-3">
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
                <div className="row">
                    <div className={`d-flex justify-content-end flex-column h-50 ${styles["date-fields-wrapper"]}`}>
                        <DateFilterField
                            setDate={handleInterval}
                            label="Start Date"
                            identifier="startDatePerformance"
                        />
                        <div className="mt-2"></div>
                        <DateFilterField
                            setDate={handleInterval}
                            label="End Date"
                            identifier="endDatePerformance"
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="d-flex justify-content-end align-items-start mt-4">
                    <DownloadCsvOptionsButton
                        fileName="performanceInfo"
                        exportFunction={handlePerformanceExport}
                    />
                </div>
                {renderContent()}
            </div>
            <Demographics demographics={demographics} />
        </>
    );
}

export async function loader({ request, params }) {
    try {
        const startDatePerformance = sessionStorage.getItem("startDatePerformance");
        const endDatePerformance = sessionStorage.getItem("endDatePerformance");
        const startDateDemographics = sessionStorage.getItem("startDateDemographics");
        const endDateDemographics = sessionStorage.getItem("endDateDemographics");
        const data = await getPerformanceInfo(startDatePerformance, endDatePerformance);

        if (data == null) {
            return redirect("/?message=Page Not Found!&type=danger");
        }

        const demographics = await getDemographicsInfo(startDateDemographics, endDateDemographics);

        return {
            data,
            demographics
        };
    } catch (error) {
        return redirect("/?message=Page Not Found!&type=danger");
    }
}