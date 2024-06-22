/* eslint-disable react/prop-types */
import styles from "./css/SellingProductsChart.module.css";
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from 'react';

const SellingCategoriesChart = ({ categories, header }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...categories.map(x => x.categoryName)],
                    datasets: [
                        {
                            label: `${header}`,
                            data: [...categories.map(x => x.soldCount)],
                            backgroundColor: 'rgba(255, 165, 0, 0.8)',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const category = categories[index];
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
    }, [chartInstance, categories, navigate, header]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center mt-3`}>
            <h2 className="text-center">{header}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SellingCategoriesChart;