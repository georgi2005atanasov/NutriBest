import NotificationsPagination from "../../components/UI/Pagination/NotificationsPagination";
import { allNotifications } from "../../../../../backend/api/notifcations";
import { redirect, useLoaderData } from "react-router-dom";
import NotificationRow from "./NotificationRow";

export default function AllNotifications() {
    const { notifications, totalNotifications } = useLoaderData();

    console.log(notifications);

    return <>
        <h1 className="text-center mt-4">Notifications</h1>
        {notifications && notifications.length > 0 ? notifications.map(x =>
            <NotificationRow
                key={`${x.message}-${x.productId}`}
                notification={x} />) :
            <h3 className="text-danger text-center mt-3">Currently There are no Notifications!</h3>}
        <NotificationsPagination
            page={sessionStorage.getItem("notifications-page")}
            notificationsCount={totalNotifications} />
    </>;
}

export async function loader({ request, params }) {
    try {
        const page = Number(sessionStorage.getItem("notifications-page"));
        const { notifications, totalNotifications } = await allNotifications(page);

        return {
            notifications,
            totalNotifications
        }
    } catch (error) {
        return redirect("/?message=Page Not Found&type=danger");
    }
}