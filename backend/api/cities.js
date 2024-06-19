import useAuth from "../../frontend/nutri-best-project/src/hooks/useAuth";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";
import { HOST } from "../utils/util";

export async function allCitiesWithCountries(requiredVerification) {
    if (requiredVerification) {
        const token = getAuthToken();
        const { isAdmin, isEmployee } = useAuth(token);

        if (!isAdmin && !isEmployee) {
            return null;
        }
    }

    const response = await fetch(`${HOST}/Cities`);
    return await response.json();
}