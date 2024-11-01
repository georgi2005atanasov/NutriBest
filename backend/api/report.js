import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function getPerformanceInfo(startDate, endDate) {
    try {
        const token = getAuthToken();
        const { isAdmin, isEmployee } = useAuth(token);

        if (!isAdmin && !isEmployee) {
            return null;
        }

        let endpoint = `${HOST}/Reports/PerformanceInfo`;

        if (startDate) {
            endpoint += `?startDate=${encodeURIComponent(startDate)}`;
        }
        if (endDate) {
            if (startDate) {
                endpoint += `&endDate=${encodeURIComponent(endDate)}`;
            }
            else {
                endpoint += `?endDate=${encodeURIComponent(endDate)}`;
            }
        }
        
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export async function getDemographicsInfo(startDate, endDate) {
    try {
        const token = getAuthToken();

        let endpoint = `${HOST}/Reports/DemographicsInfo`;

        if (startDate) {
            endpoint += `?startDate=${encodeURIComponent(startDate)}`;
        }
        if (endDate) {
            if (startDate) {
                endpoint += `&endDate=${encodeURIComponent(endDate)}`;
            }
            else {
                endpoint += `?endDate=${encodeURIComponent(endDate)}`;
            }
        }
        const response = await fetch(endpoint, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}