export async function allCitiesWithCountries() {
    const response = await fetch("https://localhost:7056/cities");
    return await response.json();
}