import { useNavigate } from "react-router-dom";

function NotificationDropdown({ notifications, onMarkRead, onMarkAllRead, onClose }) {
    const navigate = useNavigate();

    return (
        <div className="absolute right-0 mt-3 w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">Notifications</h3>
                <button onClick={onMarkAllRead} className="text-xs font-medium text-blue-600 hover:text-blue-700">
                    Mark all as read
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-slate-500">
                        No notifications yet.
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`px-5 py-4 border-b border-slate-100 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-semibold text-slate-800">{notification.title}</p>
                                    <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                </div>
                                {!notification.read && (
                                    <button
                                        onClick={() => onMarkRead(notification._id)}
                                        className="text-[10px] font-medium text-blue-600 uppercase"
                                    >
                                        Read
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                                <span>{notification.type}</span>
                                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="px-5 py-3 border-t border-slate-200 text-center">
                <button
                    onClick={() => {
                        onClose();
                        navigate("/notifications");
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    View all notifications
                </button>
            </div>
        </div>
    );
}

export default NotificationDropdown;
