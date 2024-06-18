/* eslint-disable react/prop-types */
import styles from "./css/TopSellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const TopSellingFlavoursChart = ({ topFlavours }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...topFlavours.map(x => x.flavourName)],
                    datasets: [
                        {
                            label: 'Top Selling Flavours',
                            data: [...topFlavours.map(x => x.soldCount)],
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
                            const product = topFlavours[index];
                            if (product) {
                                navigate(`/flavours`);
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
    }, [chartInstance, topFlavours, navigate]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center mt-3`}>
            <h2 className="text-center">Top Selling Flavours</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default TopSellingFlavoursChart;