/* eslint-disable react/prop-types */
import styles from "./css/TopSellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const SellingProductsChart = ({ products, header }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...products.map(x => x.name)],
                    datasets: [
                        {
                            label: `${header}`,
                            data: [...products.map(x => x.soldCount)],
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
                            const product = products[index];
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
    }, [chartInstance, products, navigate]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center`}>
            <h2 className="text-center">{header}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SellingProductsChart;