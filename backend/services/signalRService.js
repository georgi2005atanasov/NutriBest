import * as signalR from "@microsoft/signalr";
import { getAuthToken } from "../../frontend/nutri-best-project/src/utils/auth";

const token = getAuthToken();

export const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7056/Hubs/Notification', {
        accessTokenFactory: () => token
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

export const startConnection = async () => await connection.start()
    .then(async () => {
        await connection.invoke('JoinPage', window.location.pathname);
    })
    .catch(err => console.error('SignalR Connection Error: ', err));

export const stopConnection = async () => await connection.stop();

export const registerNotificationHandler = (handleNotifyAdmin) => {
    connection.on("NotifyAdmin", handleNotifyAdmin);
}
export const unregisterNotificationHandler = (callback) => {
    connection.off("NotifyAdmin", callback);
}

export const registerLowStockHandler = (handleNotifyAdmin) => {
    connection.on("NotifyLowStock", handleNotifyAdmin);
}
export const unregisterLowStockHandler = (handleNotifyAdmin) => {
    connection.off("NotifyLowStock", handleNotifyAdmin);
}

await startConnection();
