import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
    getNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "../../services/notificationService";

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await getNotifications();
            setNotifications(res.data.notifications || []);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load notifications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        const loadNotifications = async () => {
            try {
                const res = await getNotifications();

                if (!cancelled) {
                    setNotifications(res.data.notifications || []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.response?.data?.message || "Unable to load notifications.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadNotifications();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleMarkRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            fetchNotifications();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update notification.");
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsAsRead();
            fetchNotifications();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to mark all notifications as read.");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Notification Center</p>
                            <h1 className="text-4xl font-bold text-slate-900 mt-3">All notifications</h1>
                        </div>
                        <button
                            onClick={handleMarkAllRead}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
                        Loading notifications...
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
                        No notifications right now.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`bg-white rounded-2xl border p-5 shadow-sm ${notification.read ? "border-slate-200" : "border-blue-200 bg-blue-50"}`}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium uppercase">
                                                {notification.type}
                                            </span>
                                            {!notification.read && (
                                                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-[10px] font-semibold uppercase">
                                                    Unread
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{notification.title}</h3>
                                        <p className="text-slate-600 mt-2">{notification.message}</p>
                                    </div>

                                    {!notification.read && (
                                        <button
                                            onClick={() => handleMarkRead(notification._id)}
                                            className="border border-blue-200 text-blue-700 px-3 py-2 rounded-xl font-medium hover:bg-blue-100"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                                    {notification.link && (
                                        <a href={notification.link} className="text-blue-600 font-medium hover:text-blue-700">
                                            {notification.action || "Open"}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default NotificationsPage;
