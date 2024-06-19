import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function getPerformanceInfo() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/PerformanceInfo`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function getDemographicsInfo() {
    try {
        const token = getAuthToken();
        const response = await fetch(`${HOST}/Reports/DemographicsInfo`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}