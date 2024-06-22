import DownloadCsvButton from "../../components/UI/Buttons/Download/DownloadCsvButton";
import { exportOrdersSummary } from "../../../../../backend/api/api";
import { memo } from "react";

/* eslint-disable react/prop-types */
export default memo(function OrdersSummary({ data }) {
    const handleExport = async () => {
        return await exportOrdersSummary();
    };

    return <div className="d-flex justify-content-end align-items-center">
        <div className="w-100 bg-light p-2 d-flex flex-row justify-content-start align-items-center m-1 py-2">
            <div className="d-flex flex-column">
                <h6>
                    Total Orders: <span className="font-weight-light">{data && data.totalOrders}</span>
                </h6>
                <h6>
                    Total Products: {data && data.totalProducts}
                </h6>
                <h6>
                    Total Price Without Discounts: {data && data.totalPriceWithoutDiscount && data.totalPriceWithoutDiscount.toFixed(2)} BGN
                </h6>
                <h6>
                    Total Discount: {data && data.totalDiscounts && data.totalDiscounts.toFixed(2)} BGN
                </h6>
                <h6>
                    Total Profit: {data && data.totalPrice && data.totalPrice.toFixed(2)} BGN
                </h6>
            </div>
            <div className="ms-5">
                <DownloadCsvButton
                    fileName="ordersSummary"
                    exportFunction={handleExport} />
            </div>
        </div>
    </div>
});