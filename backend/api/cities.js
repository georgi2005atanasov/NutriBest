import { HOST } from "../utils/util";

export async function allCitiesWithCountries() {
    const response = await fetch(`${HOST}/Cities`);
    return await response.json();
}