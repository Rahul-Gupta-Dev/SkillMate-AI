import { FaBell } from "react-icons/fa";

function NotificationBell() {
    return (
        <button className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <FaBell />
        </button>
    );
}

export default NotificationBell;