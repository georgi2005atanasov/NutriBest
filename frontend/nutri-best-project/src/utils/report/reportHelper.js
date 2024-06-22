export function getReportFilters() {
    const startDatePerformance = sessionStorage.getItem("startDatePerformance");
    const endDatePerformance = sessionStorage.getItem("endDatePerformance");
    const startDateDemographics = sessionStorage.getItem("startDateDemographics");
    const endDateDemographics = sessionStorage.getItem("endDateDemographics");

    return {
        startDatePerformance ,
        endDatePerformance,
        startDateDemographics,
        endDateDemographics
    };
}