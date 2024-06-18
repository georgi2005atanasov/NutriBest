/* eslint-disable react/prop-types */
import styles from "./css/TopSellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const TopSellingProductsChart = ({ topProducts }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    console.log(topProducts);

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...topProducts.map(x => x.name)],
                    datasets: [
                        {
                            label: 'Top Selling Products',
                            data: [...topProducts.map(x => x.soldCount)],
                            backgroundColor: 'rgba(220, 20, 60, 0.8)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const product = topProducts[index];
                            if (product) {
                                navigate(`/products/details/${product.productId}/${product.name}`);
                            }
                        }
                    }
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartInstance, topProducts, navigate]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center`}>
            <h2 className="text-center">Top Selling Products</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TopSellingProductsChart;