import useAuth from "../../../hooks/useAuth";
import { getAuthToken } from "../../../utils/auth"
import NavigationLink from "../../Navigation/NavigationLink"

export default function AddPromotionButton() {
    const token = getAuthToken();
    const {isAdmin} = useAuth(token);

    return <NavigationLink
        route={"/promotions/add"}
        text={"Add Promotion"}
        isAdmin={isAdmin}
        className={`d-flex justify-content-center align-items-center p-0`} />
}