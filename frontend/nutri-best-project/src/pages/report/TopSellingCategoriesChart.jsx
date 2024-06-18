/* eslint-disable react/prop-types */
import styles from "./css/TopSellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const TopSellingCategoriesChart = ({ topCategories }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...topCategories.map(x => x.categoryName)],
                    datasets: [
                        {
                            label: 'Top Selling Categories',
                            data: [...topCategories.map(x => x.soldCount)],
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
                            const category = topCategories[index];
                            if (category) {
                                navigate(`/categories`);
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
    }, [chartInstance, topCategories, navigate]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center mt-3`}>
            <h2 className="text-center">Top Selling Categories</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TopSellingCategoriesChart;