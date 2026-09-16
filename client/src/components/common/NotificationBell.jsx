import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import {
    getNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    seedNotifications,
} from "../../services/notificationService";

function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const res = await getNotifications();
            setNotifications(res.data.notifications || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const hydrate = async () => {
            try {
                await seedNotifications();
            } catch (error) {
                console.error(error);
            } finally {
                fetchNotifications();
            }
        };

        hydrate();
    }, []);

    const unreadCount = notifications.filter((item) => !item.read).length;

    const handleMarkRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsAsRead();
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                aria-label="Notifications"
            >
                <FaBell className="text-slate-700" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <NotificationDropdown
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onMarkAllRead={handleMarkAllRead}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    );
}

export default NotificationBell;