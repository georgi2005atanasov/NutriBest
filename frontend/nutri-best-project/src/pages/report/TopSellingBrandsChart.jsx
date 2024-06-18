/* eslint-disable react/prop-types */
import styles from "./css/TopSellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const TopSellingBrandsChart = ({ topBrands }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    console.log(topBrands);

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...topBrands.map(x => x.brandName)],
                    datasets: [
                        {
                            label: 'Top Selling Brands',
                            data: [...topBrands.map(x => x.soldCount)],
                            backgroundColor: 'rgba(0, 128, 128, 0.8)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const brand = topBrands[index];
                            if (brand) {
                                navigate(`/brands`);
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
    }, [chartInstance, topBrands, navigate]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center`}>
            <h2 className="text-center">Top Selling Brands</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TopSellingBrandsChart;