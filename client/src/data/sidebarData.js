import {
    FaHome,
    FaRobot,
    FaCalendarAlt,
    FaClipboardList,
    FaChartLine,
    FaBookOpen,
    FaUser,
} from "react-icons/fa";

const sidebarData = [
    {
        id: 1,
        title: "Dashboard",
        icon: FaHome,
        path: "/",
    },
    {
        id: 2,
        title: "AI Tutor",
        icon: FaRobot,
        path: "/ai-tutor",
    },
    {
        id: 3,
        title: "Study Plan",
        icon: FaCalendarAlt,
        path: "/study-plan",
    },
    {
        id: 4,
        title: "Quiz",
        icon: FaClipboardList,
        path: "/quiz",
    },
    {
        id: 5,
        title: "Progress",
        icon: FaChartLine,
        path: "/progress",
    },
    {
        id: 6,
        title: "Resources",
        icon: FaBookOpen,
        path: "/resources",
    },
    {
        id: 7,
        title: "Profile",
        icon: FaUser,
        path: "/profile",
    },
];

export default sidebarData;