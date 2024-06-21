/* eslint-disable react/prop-types */
import styles from "./css/SellingProductsChart.module.css";
import DateFilterField from "../order/DateFilterField";
import DownloadCsvOptionsButton from "../../components/UI/Buttons/Download/DownloadCsvOptionsButton";
import { Pie } from 'react-chartjs-2';
import { useSubmit } from "react-router-dom";
import { useCallback } from "react";
import { exportDemographicsInfo } from "../../../../../backend/api/report";

export default function Demographics({ demographics }) {
    const submit = useSubmit();
    console.log(demographics);

    const groupedByCountry = demographics && demographics.reduce((acc, item) => {
        if (!acc[item.country]) {
            acc[item.country] = [];
        }
        acc[item.country].push(item);
        return acc;
    }, {});

    const generateChartData = (data) => {
        const labels = data.map(item => item.city);
        const dataValues = data.map(item => item.soldCount);

        return {
            labels: labels,
            datasets: [
                {
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' orders';
                        }
                        return label;
                    },
                },
            },
        },
    };

    const handleInterval = useCallback(function handleInterval(identifier, value) {
        sessionStorage.setItem(identifier, value.toISOString());
        return submit(null, { action: "/report/dashboard", method: "GET" });
    }, [submit]);

    const handleDemographicsExport = useCallback(async function handleDemographicsExport(hasFilters) {
        return await exportDemographicsInfo(hasFilters,
            hasFilters && sessionStorage.getItem("startDateDemographics"),
            hasFilters && sessionStorage.getItem("endDateDemographics")
        );
    }, []);

    return (
        <>
            <h2 className={`${styles["report-header"]} p-2 mt-3 mb-0 text-center`}>
                Demographics (Top Cities)
            </h2>
            <div className={`container mt-1 d-flex justify-content-end ${styles["date-fields-wrapper"]} flex-column`}>
                <DateFilterField
                    setDate={handleInterval}
                    label="Start Date"
                    identifier="startDateDemographics"
                />
                <div className="mt-2"></div>
                <DateFilterField
                    setDate={handleInterval}
                    label="End Date"
                    identifier="endDateDemographics"
                />
            </div>
            <div>
                <div className="d-flex justify-content-end align-items-start mt-4 me-2">
                    <DownloadCsvOptionsButton
                        fileName="demographicsInfo"
                        exportFunction={handleDemographicsExport}
                    />
                </div>
                <div className="container d-flex justify-content-center align-items-center flex-xl-row flex-column">
                    {groupedByCountry && Object.entries(groupedByCountry).map(([country, data]) => (
                        <div key={country} className={`${styles["pie-chart-wrapper"]}`}>
                            <h3 className="text-center">{country}</h3>
                            <Pie data={generateChartData(data)} options={options} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}