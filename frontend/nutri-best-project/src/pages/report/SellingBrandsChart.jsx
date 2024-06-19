/* eslint-disable react/prop-types */
import styles from "./css/SellingProductsChart.module.css";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { useNavigate } from "react-router-dom";

const SellingBrandsChart = ({ brands, header }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data: {
                    labels: [...brands.map(x => x.brandName)],
                    datasets: [
                        {
                            label: `${header}`,
                            data: [...brands.map(x => x.soldCount)],
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
                            const brand = brands[index];
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
    }, [chartInstance, brands, navigate, header]);

    return (
        <div className={`${styles["chart-wrapper"]} w-100 d-flex flex-column align-items-center`}>
            <h2 className="text-center">{header}</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SellingBrandsChart;