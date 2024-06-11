import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7056/Hubs/Notification')
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.start()
    .then(async () => {
        console.log('SignalR Connected.');
        await connection.invoke('AddToAdminGroup');
    })
    .catch(err => console.error('SignalR Connection Error: ', err));

export const registerNotificationHandler = (handleNotifyAdmin) => {
    connection.on("NotifyAdmin", handleNotifyAdmin);
}

export const onReceiveNotification = (callback) => {
    connection.on('ReceiveNotification', callback);
};