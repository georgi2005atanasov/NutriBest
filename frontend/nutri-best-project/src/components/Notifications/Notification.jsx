import { useEffect, useState } from 'react';
import { onReceiveNotification, registerNotificationHandler } from '../../../../../backend/services/signalRService';

function Notification() {
    const [notifications, setNotifications] = useState([]);

    const handleNotifyAdmin = (notificationType, message) => {
        setNotifications(prevNotifications => [...prevNotifications, { type: notificationType, message }]);
    };

    useEffect(() => {
        onReceiveNotification((type, message) => {
            setNotifications(prevNotifications => [...prevNotifications, { type, message }]);
        });

        registerNotificationHandler(handleNotifyAdmin);
    }, []);

    

    return (
        <div className="NotificationComponent">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <strong>{notification.type}: </strong>{notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notification;