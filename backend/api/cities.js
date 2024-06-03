export async function allCitiesWithCountries() {
    const response = await fetch("https://localhost:7056/Cities");
    return await response.json();
}