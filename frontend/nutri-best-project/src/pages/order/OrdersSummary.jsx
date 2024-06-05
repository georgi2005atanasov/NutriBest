import { memo } from "react";

/* eslint-disable react/prop-types */
export default memo(function OrdersSummary({ data }) {
    return <div className="d-flex justify-content-end">
        <div className="w-25 bg-light p-2 d-flex flex-column justify-content-start m-3 py-2">
            <h6>
                Total Orders: <span className="font-weight-light">{data && data.totalOrders}</span>
            </h6>
            <h6>
                Total Products: {data && data.totalProducts}
            </h6>
            <h6>
                Total Price Without Discounts: {data && data.totalPriceWithoutDiscount.toFixed(2)} BGN
            </h6>
            <h6>
                Total Discount: {data && data.totalDiscounts.toFixed(2)} BGN
            </h6>
            <h6>
                Total Profit: {data && data.totalPrice.toFixed(2)} BGN
            </h6>
        </div>
    </div>
});