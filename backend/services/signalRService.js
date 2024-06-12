import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7056/Hubs/Notification')
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

await connection.start()
    .then(async () => {
        await connection.invoke('JoinPage', window.location.pathname);
    })
    .catch(err => console.error('SignalR Connection Error: ', err));

export const registerNotificationHandler = (handleNotifyAdmin) => {
    connection.on("NotifyAdmin", handleNotifyAdmin);
}

export const unregisterNotificationHandler = (eventName, callback) => {
    connection.off("NotifyAdmin", callback);
}

export const onReceiveNotification = (callback) => {
    connection.on('ReceiveNotification', callback);
};

export { connection };
